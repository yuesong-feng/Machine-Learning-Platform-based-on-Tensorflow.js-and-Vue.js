<template>
  <div>
    <bar></bar>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <drawer v-on:add="addlayer"></drawer>
          <v-col>
            <v-sheet min-height="100vh" rounded="lg">
              <v-btn @click="getall">汇总测试</v-btn>
              <v-btn @click="run">开始训练</v-btn>
              <component
                v-for="(item, index) in layers"
                :is="item.name"
                :key="index"
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
export default {
  data: () => ({
    layers: [],
  }),
  components: {
    bar,
    drawer,
    conv2d,
  },
  methods: {
    addlayer(layername) {
      this.layers.push({
        name: layername,
      });
    },
    remove(index) {
      console.log(this.layers[index]);
      // this.layers.splice(index, 1);
    },
    async run() {
      tfvis.visor();
    },
    getall() {
      console.log(this.layers["1"]);
      console.log(this.layers["1"].name);
    },
  },
  mounted() {},
};
</script>
