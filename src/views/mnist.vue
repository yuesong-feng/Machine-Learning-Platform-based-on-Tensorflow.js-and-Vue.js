<template>
  <div>
    <bar></bar>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <drawer v-on:add="addLayer"></drawer>
          <v-col>
            <v-sheet min-height="100vh" rounded="lg">
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="3">
                  <v-btn @click="defaultLayers()">默认层</v-btn></v-col
                >
                <v-col cols="3">
                  <v-btn @click="defaultParameters()">默认参数</v-btn></v-col
                >
                <v-col cols="3">
                  <v-btn @click="defaultValues()">默认值</v-btn></v-col
                >
                <v-col cols="1"></v-col>
              </v-row>

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
                <v-col cols="2"></v-col>
                <v-col cols="3">
                  <v-btn @click="getModel()">获取模型</v-btn></v-col
                >
                <v-col cols="3"> <v-btn @click="run()">开始训练</v-btn></v-col>
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
import { log } from "vega";
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
    defaultLayers() {
      this.addLayer("conv2d");
      this.addLayer("maxPooling2d");
      this.addLayer("conv2d");
      this.addLayer("maxPooling2d");
      this.addLayer("flatten");
      this.addLayer("dense");
      this.addLayer("compile");
    },
    defaultParameters() {
      this.$refs.getParameters[0].addParameter("inputShape");
      this.$refs.getParameters[0].addParameter("kernelSize");
      this.$refs.getParameters[0].addParameter("filters");
      this.$refs.getParameters[0].addParameter("strides");
      this.$refs.getParameters[0].addParameter("activation");
      this.$refs.getParameters[0].addParameter("kernelInitializer");
      this.$refs.getParameters[1].addParameter("poolSize");
      this.$refs.getParameters[1].addParameter("strides");
      this.$refs.getParameters[2].addParameter("kernelSize");
      this.$refs.getParameters[2].addParameter("filters");
      this.$refs.getParameters[2].addParameter("strides");
      this.$refs.getParameters[2].addParameter("activation");
      this.$refs.getParameters[2].addParameter("kernelInitializer");
      this.$refs.getParameters[3].addParameter("poolSize");
      this.$refs.getParameters[3].addParameter("strides");
      this.$refs.getParameters[5].addParameter("units");
      this.$refs.getParameters[5].addParameter("kernelInitializer");
      this.$refs.getParameters[5].addParameter("activation");
      this.$refs.getParameters[6].addParameter("optimizer");
      this.$refs.getParameters[6].addParameter("loss");
      this.$refs.getParameters[6].addParameter("metrics");
    },
    defaultValues() {
      this.$refs.getParameters[0].$refs.Parameters[0].value = "28,28,1";
      this.$refs.getParameters[0].$refs.Parameters[1].value = "5";
      this.$refs.getParameters[0].$refs.Parameters[2].value = "8";
      this.$refs.getParameters[0].$refs.Parameters[3].value = "1";
      this.$refs.getParameters[0].$refs.Parameters[4].value = "relu";
      this.$refs.getParameters[0].$refs.Parameters[5].value = "varianceScaling";
      this.$refs.getParameters[1].$refs.Parameters[0].value = "2,2";
      this.$refs.getParameters[1].$refs.Parameters[1].value = "2,2";
      this.$refs.getParameters[2].$refs.Parameters[0].value = "5";
      this.$refs.getParameters[2].$refs.Parameters[1].value = "16";
      this.$refs.getParameters[2].$refs.Parameters[2].value = "1";
      this.$refs.getParameters[2].$refs.Parameters[3].value = "relu";
      this.$refs.getParameters[2].$refs.Parameters[4].value = "varianceScaling";
      this.$refs.getParameters[3].$refs.Parameters[0].value = "2,2";
      this.$refs.getParameters[3].$refs.Parameters[1].value = "2,2";
      this.$refs.getParameters[5].$refs.Parameters[0].value = "10";
      this.$refs.getParameters[5].$refs.Parameters[1].value = "varianceScaling";
      this.$refs.getParameters[5].$refs.Parameters[2].value = "softmax";
      this.$refs.getParameters[6].$refs.Parameters[0].value = "tf.train.adam()";
      this.$refs.getParameters[6].$refs.Parameters[1].value =
        "categoricalCrossentropy";
      this.$refs.getParameters[6].$refs.Parameters[2].value = "['accuracy']";
    },
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
    getModel() {
      let model = tf.sequential();
      for (let i = 0; i < this.$refs.getParameters.length - 1; i++) {
        this.$refs.getParameters[i].sendData();
        model = this.$refs.getParameters[i].addData(
          model,
          this.$refs.getParameters[i].layerData
        );
      }
      model.compile({
        optimizer: tf.train.adam(),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
      });
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
    async train(model, data) {
      const metrics = ["loss", "val_loss", "acc", "val_acc"];
      const container = {
        name: "Model Training",
        tab: "Model",
        styles: { height: "1000px" },
      };
      const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

      const BATCH_SIZE = 512;
      const TRAIN_DATA_SIZE = 5500;
      const TEST_DATA_SIZE = 1000;

      const [trainXs, trainYs] = tf.tidy(() => {
        const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
        return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
      });

      const [testXs, testYs] = tf.tidy(() => {
        const d = data.nextTestBatch(TEST_DATA_SIZE);
        return [d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]), d.labels];
      });
      return model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        validationData: [testXs, testYs],
        epochs: 10,
        shuffle: true,
        callbacks: fitCallbacks,
      });
    },
    doPrediction(model, data, testDataSize = 500) {
      const IMAGE_WIDTH = 28;
      const IMAGE_HEIGHT = 28;
      const testData = data.nextTestBatch(testDataSize);
      const testxs = testData.xs.reshape([
        testDataSize,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        1,
      ]);
      const labels = testData.labels.argMax(-1);
      const preds = model.predict(testxs).argMax(-1);

      testxs.dispose();
      return [preds, labels];
    },
    async showAccuracy(model, data) {
      const classNames = [
        "Zero",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
      ];
      const [preds, labels] = this.doPrediction(model, data);
      const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
      const container = { name: "Accuracy", tab: "Evaluation" };
      tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

      labels.dispose();
    },
    async showConfusion(model, data) {
      const classNames = [
        "Zero",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
      ];
      const [preds, labels] = this.doPrediction(model, data);
      const confusionMatrix = await tfvis.metrics.confusionMatrix(
        labels,
        preds
      );
      const container = { name: "Confusion Matrix", tab: "Evaluation" };
      tfvis.render.confusionMatrix(container, {
        values: confusionMatrix,
        tickLabels: classNames,
      });

      labels.dispose();
    },
    async run() {
      const data = new MnistData();
      await data.load();
      await this.showExamples(data);
      const model = this.getModel();
      tfvis.show.modelSummary(
        { name: "Model Architecture", tab: "Model" },
        model
      );
      await this.train(model, data);
      await this.showAccuracy(model, data);
      await this.showConfusion(model, data);
    },
  },
  mounted() {},
};
</script>
