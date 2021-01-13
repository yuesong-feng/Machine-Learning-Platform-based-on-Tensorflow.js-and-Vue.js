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
                <v-col cols="3"> <v-btn @click="test()">汇总测试</v-btn></v-col>
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
    test() {
      let model = tf.sequential();
      for (let i = 0; i < this.$refs.getParameters.length; i++) {
        this.$refs.getParameters[i].sendData();
        model = this.$refs.getParameters[i].addData(model, this.$refs.getParameters[i].layerData);
      }
      console.log(model.summary());
      return model
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
    // getModel() {
    //   const model = tf.sequential();
    //   const IMAGE_WIDTH = 28;
    //   const IMAGE_HEIGHT = 28;
    //   const IMAGE_CHANNELS = 1;
    //
    //   // In the first layer of our convolutional neural network we have
    //   // to specify the input shape. Then we specify some parameters for
    //   // the convolution operation that takes place in this layer.
    //   model.add(
    //     tf.layers.conv2d({
    //       inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    //       kernelSize: 5,
    //       filters: 8,
    //       strides: 1,
    //       activation: "relu",
    //       kernelInitializer: "varianceScaling",
    //     })
    //   );
    //
    //   // The MaxPooling layer acts as a sort of downsampling using max values
    //   // in a region instead of averaging.
    //   model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    //
    //   // Repeat another conv2d + maxPooling stack.
    //   // Note that we have more filters in the convolution.
    //   model.add(
    //     tf.layers.conv2d({
    //       kernelSize: 5,
    //       filters: 16,
    //       strides: 1,
    //       activation: "relu",
    //       kernelInitializer: "varianceScaling",
    //     })
    //   );
    //   model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    //
    //   // Now we flatten the output from the 2D filters into a 1D vector to prepare
    //   // it for input into our last layer. This is common practice when feeding
    //   // higher dimensional data to a final classification output layer.
    //   model.add(tf.layers.flatten());
    //
    //   // Our last layer is a dense layer which has 10 output units, one for each
    //   // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
    //   const NUM_OUTPUT_CLASSES = 10;
    //   model.add(
    //     tf.layers.dense({
    //       units: NUM_OUTPUT_CLASSES,
    //       kernelInitializer: "varianceScaling",
    //       activation: "softmax",
    //     })
    //   );
    //
    //   // Choose an optimizer, loss function and accuracy metric,
    //   // then compile and return the model
    //   const optimizer = tf.train.adam();
    //   model.compile({
    //     optimizer: optimizer,
    //     loss: "categoricalCrossentropy",
    //     metrics: ["accuracy"],
    //   });
    //
    //   return model;
    // },
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
    async run() {
      const data = new MnistData();
      await data.load();
      await this.showExamples(data);
      // const model = this.getModel();
      const model = this.test()
      tfvis.show.modelSummary(
        { name: "Model Architecture", tab: "Model" },
        model
      );
      await this.train(model, data);
    },
  },
  mounted() {},
};
</script>
