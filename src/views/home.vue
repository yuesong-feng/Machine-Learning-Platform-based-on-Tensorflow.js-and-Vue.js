<template>
  <div>
    <bar></bar>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <drawer v-on:add="addLayer"></drawer>
          <v-col>
            <v-sheet min-height="100vh" rounded="lg">
              <v-btn @click="test()">汇总测试</v-btn>
              <v-btn @click="run()">开始训练</v-btn>
              <component
                ref="getParameters"
                v-for="(item, index) in layers"
                :is="item.name"
                :key="index"
                v-bind:index="index"
                v-bind:totalLayers="getTotalLayers()"
                @remove="remove(index)"
              ></component>
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
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { MnistData } from "../assets/data.js";

import conv2d from "../assets/conv2d.vue";
import maxPooling2d from "../assets/maxPooling2d.vue";
import flatten from "../assets/flatten";
import dense from "@/assets/dense";

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
      for (let i = 0; i < this.$refs.getParameters.length; i++) {
        this.$refs.getParameters[i].sendData();
        console.log(this.$refs.getParameters[i].layerData);
      }
    },
    async run() {
      tfvis.visor();
    },
  },
  mounted() {},
};
</script>
