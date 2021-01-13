<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">conv2d</span>
        </v-card-title>
      </template>
      <span
        >2D convolution layer (e.g. spatial convolution over images).
        <br /><br />This layer creates a convolution kernel that is convolved
        with the layer input to produce a tensor of outputs. <br /><br />If
        useBias is True, a bias vector is created and added to the outputs.
        <br /><br />If activation is not null, it is applied to the outputs as
        well. <br /><br />When using this layer as the first layer in a model,
        provide the keyword argument inputShape (Array of integers, does not
        include the sample axis), e.g. inputShape=[128, 128, 3] for 128x128 RGB
        pictures in dataFormat='channelsLast'.</span
      >
    </v-tooltip>
    <v-card-actions>
      <v-row no-gutters>
        <v-col cols="3">
          <v-select
            v-model="selectedParameter"
            :items="parameters"
            label="Select Parameter"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-btn color="blue" @click="addParameter(selectedParameter)"
            >add</v-btn
          >
        </v-col>
        <v-col cols="3">
          <v-btn color="error" @click="removeParameter"> remove </v-btn>
        </v-col>
        <v-col cols="5">
          <v-btn
            color="error"
            @click="removeLayer"
            v-if="this.index + 1 == this.totalLayers"
          >
            remove_layer
          </v-btn>
          <v-btn
            color="error"
            @click="removeLayer"
            disabled
            v-if="this.index + 1 != this.totalLayers"
          >
            remove_layer
          </v-btn>
        </v-col>

        <component
          ref="Parameters"
          v-for="(item, index) in allParameters"
          :is="item.name"
          :key="index"
          v-bind:index="index"
        ></component>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import filters from "@/parameter/filters";
import kernelSize from "@/parameter/kernelSize";
import strides from "@/parameter/strides";
import padding from "@/parameter/padding";
import dataFormat from "@/parameter/dataFormat";
import dilationRate from "@/parameter/dilationRate";
import activation from "@/parameter/activation";
import useBias from "@/parameter/useBias";
import kernelInitializer from "@/parameter/kernelInitializer";
import biasInitializer from "@/parameter/biasInitializer";
import kernelConstraint from "@/parameter/kernelConstraint";
import biasConstraint from "@/parameter/biasConstraint";
import kernelRegularizer from "@/parameter/kernelRegularizer";
import biasRegularizer from "@/parameter/biasRegularizer";
import activityRegularizer from "@/parameter/activityRegularizer";
import inputShape from "@/parameter/inputShape";
import batchInputShape from "@/parameter/batchInputShape";
import batchSize from "@/parameter/batchSize";
import dtype from "@/parameter/dtype";
import name from "@/parameter/name";
import trainable from "@/parameter/trainable";
import weights from "@/parameter/weights";
import inputDType from "@/parameter/inputDType";
import * as tf from "@tensorflow/tfjs";
export default {
  components: {
    filters,
    kernelSize,
    strides,
    padding,
    dataFormat,
    dilationRate,
    activation,
    useBias,
    kernelInitializer,
    biasInitializer,
    kernelConstraint,
    biasConstraint,
    kernelRegularizer,
    biasRegularizer,
    activityRegularizer,
    inputShape,
    batchInputShape,
    batchSize,
    dtype,
    name,
    trainable,
    weights,
    inputDType,
  },
  props: {
    index: {
      type: Number,
    },
    totalLayers: {
      type: Number,
    },
  },
  data: () => ({
    selectedParameter: "",
    parameters: [
      "filters",
      "kernelSize",
      "strides",
      "padding",
      "dataFormat",
      "dilationRate",
      "activation",
      "useBias",
      "kernelInitializer",
      "biasInitializer",
      "kernelConstraint",
      "biasConstraint",
      "kernelRegularizer",
      "biasRegularizer",
      "activityRegularizer",
      "inputShape",
      "batchInputShape",
      "batchSize",
      "dtype",
      "name",
      "trainable",
      "weights",
      "inputDType",
    ],
    allParameters: [],
    layerData: { layerName: "conv2d" },
  }),
  methods: {
    addParameter(layerName) {
      this.allParameters.push({
        name: layerName,
      });
      this.selectedParameter = "";
    },
    removeParameter() {
      this.allParameters.pop();
    },
    removeLayer() {
      this.$emit("remove", "");
    },
    sendData() {
      if (this.$refs.Parameters == null) {
        return;
      }
      for (let i = 0; i < this.$refs.Parameters.length; i++) {
        this.$refs.Parameters[i].sendData();
        for (let key in this.$refs.Parameters[i].parameterData) {
          this.layerData[key] = this.$refs.Parameters[i].parameterData[key];
        }
      }
    },
    addData(model, parameters) {
      delete parameters["layerName"];
      let args = {};
      for (let each in parameters) {
        if (each == "inputShape") {
          args[each] = parameters[each].split(",").map(Number);
        }
        else if(each == "activation" || each == "kernelInitializer"){
          args[each] = parameters[each]
        }
        else {
          args[each] = Number(parameters[each]);
        }
      }
      model.add(tf.layers.conv2d(args));
      return model;
    },
  },
  mounted() {},
};
</script>
