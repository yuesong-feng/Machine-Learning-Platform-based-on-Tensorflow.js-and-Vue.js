<template>
  <div>
    <bar></bar>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <drawer v-on:add="addLayer"></drawer>
          <v-col>
            <v-sheet min-height="100vh" rounded="lg">
              <component
                ref="getParameters"
                v-for="(item, index) in layers"
                :is="item.name"
                :key="index"
                v-bind:index="index"
                v-bind:totalLayers="getTotalLayers()"
                @remove="remove(index)"
              ></component>
              <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="3">
                  <v-btn @click="createModel()">汇总测试</v-btn></v-col
                >
                <v-col cols="3"> <v-btn @click="run()">开始训练</v-btn></v-col>
                <v-col cols="3"></v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import bar from "../layouts/bar.vue";
import drawer from "../layouts/drawer.vue";
import MNIST from "@/assets/MNIST";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { MnistData } from "../assets/data.js";

import conv2d from "../assets/conv2d.vue";
import maxPooling2d from "../assets/maxPooling2d.vue";
import flatten from "../assets/flatten";
import dense from "@/assets/dense";
import compile from "@/assets/compile";
export default {
  data: () => ({
    layers: [],
  }),
  components: {
    bar,
    drawer,
    conv2d,
    maxPooling2d,
    flatten,
    dense,
    MNIST,
    compile,
  },
  methods: {
    addLayer(layerName) {
      this.layers.push({
        name: layerName,
      });
    },
    remove(index) {
      this.layers.splice(index, 1);
    },
    getTotalLayers() {
      return this.layers.length;
    },
    createModel() {
      let model = tf.sequential();
      for (let i = 0; i < this.$refs.getParameters.length; i++) {
        this.$refs.getParameters[i].sendData();
        model = this.$refs.getParameters[i].addData(
          model,
          this.$refs.getParameters[i].layerData
        );
      }
      console.log(model.summary());
      return model;
    },
    async showExamples(data) {
      // Create a container in the visor
      const surface = tfvis
        .visor()
        .surface({ name: "Input Data Examples", tab: "Input Data" });

      // Get the examples
      const examples = data.nextTestBatch(20);
      const numExamples = examples.xs.shape[0];

      // Create a canvas element to render each example
      for (let i = 0; i < numExamples; i++) {
        const imageTensor = tf.tidy(() => {
          // Reshape the image to 28x28 px
          return examples.xs
            .slice([i, 0], [1, examples.xs.shape[1]])
            .reshape([28, 28, 1]);
        });

        const canvas = document.createElement("canvas");
        canvas.width = 28;
        canvas.height = 28;
        canvas.style = "margin: 4px;";
        await tf.browser.toPixels(imageTensor, canvas);
        surface.drawArea.appendChild(canvas);

        imageTensor.dispose();
      }
    },
    async getData() {
      const carsDataResponse = await fetch(
        "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
      );
      const carsData = await carsDataResponse.json();
      const cleaned = carsData
        .map((car) => ({
          mpg: car.Miles_per_Gallon,
          horsepower: car.Horsepower,
        }))
        .filter((car) => car.mpg != null && car.horsepower != null);

      return cleaned;
    },
    /**
     * Convert the input data to tensors that we can use for machine
     * learning. We will also do the important best practices of _shuffling_
     * the data and _normalizing_ the data
     * MPG on the y-axis.
     */
    convertToTensor(data) {
      // Wrapping these calculations in a tidy will dispose any
      // intermediate tensors.

      return tf.tidy(() => {
        // Step 1. Shuffle the data
        tf.util.shuffle(data);

        // Step 2. Convert data to Tensor
        const inputs = data.map((d) => d.horsepower);
        const labels = data.map((d) => d.mpg);

        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizedInputs = inputTensor
          .sub(inputMin)
          .div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor
          .sub(labelMin)
          .div(labelMax.sub(labelMin));

        return {
          inputs: normalizedInputs,
          labels: normalizedLabels,
          // Return the min/max bounds so we can use them later.
          inputMax,
          inputMin,
          labelMax,
          labelMin,
        };
      });
    },
    async trainModel(model, inputs, labels) {
      // Prepare the model for training.
      model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ["mse"],
      });

      const batchSize = 32;
      const epochs = 50;

      return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
          { name: "Training Performance" },
          ["loss", "mse"],
          { height: 200, callbacks: ["onEpochEnd"] }
        ),
      });
    },
    testModel(model, inputData, normalizationData) {
      const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

      // Generate predictions for a uniform range of numbers between 0 and 1;
      // We un-normalize the data by doing the inverse of the min-max scaling
      // that we did earlier.
      const [xs, preds] = tf.tidy(() => {
        const xs = tf.linspace(0, 1, 100);
        const preds = model.predict(xs.reshape([100, 1]));

        const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);

        const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

        // Un-normalize the data
        return [unNormXs.dataSync(), unNormPreds.dataSync()];
      });

      const predictedPoints = Array.from(xs).map((val, i) => {
        return { x: val, y: preds[i] };
      });

      const originalPoints = inputData.map((d) => ({
        x: d.horsepower,
        y: d.mpg,
      }));

      tfvis.render.scatterplot(
        { name: "Model Predictions vs Original Data" },
        {
          values: [originalPoints, predictedPoints],
          series: ["original", "predicted"],
        },
        {
          xLabel: "Horsepower",
          yLabel: "MPG",
          height: 300,
        }
      );
    },
    async run() {
      // Load and plot the original input data that we are going to train on.
      const data = await this.getData();
      const values = data.map((d) => ({
        x: d.horsepower,
        y: d.mpg,
      }));

      tfvis.render.scatterplot(
        { name: "Horsepower v MPG" },
        { values },
        {
          xLabel: "Horsepower",
          yLabel: "MPG",
          height: 300,
        }
      );

      // More code will be added below
      const model = this.createModel();
      tfvis.show.modelSummary({ name: "Model Summary" }, model);
      // Convert the data to a form we can use for training.
      const tensorData = this.convertToTensor(data);
      const { inputs, labels } = tensorData;

      // Train the model
      await this.trainModel(model, inputs, labels);
      console.log("Done Training");
      this.testModel(model, data, tensorData);
    },
  },
  mounted() {},
};
</script>
