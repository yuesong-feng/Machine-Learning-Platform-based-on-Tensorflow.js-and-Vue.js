<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">maxPooling2d</span>
        </v-card-title>
      </template>
      <span
        >Max pooling operation for spatial data.<br /><br />

        Input shape <br />If dataFormat === CHANNEL_LAST: 4D tensor with shape:
        [batchSize, rows, cols, channels] <br />If dataFormat === CHANNEL_FIRST:
        4D tensor with shape: [batchSize, channels, rows, cols]
        <br /><br />Output shape <br />If dataFormat=CHANNEL_LAST: 4D tensor
        with shape: [batchSize, pooleRows, pooledCols, channels] <br />If
        dataFormat=CHANNEL_FIRST: 4D tensor with shape: [batchSize, channels,
        pooleRows, pooledCols]</span
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
import poolSize from "@/parameter/poolSize";
import strides from "@/parameter/strides";
import padding from "@/parameter/padding";
import dataFormat from "@/parameter/dataFormat";
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
    poolSize,
    strides,
    padding,
    dataFormat,
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
      "poolSize",
      "strides",
      "padding",
      "dataFormat",
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
    layerData: { layerName: "maxPooling2d" },
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
        if (each == "poolSize" || each == "strides") {
          args[each] = parameters[each].split(",").map(Number);
        }
        else if(each == "activation" || each == "kernelInitializer"){
          args[each] = parameters[each]
        }
        else {
          args[each] = Number(parameters[each]);
        }
      }
      model.add(tf.layers.maxPooling2d(args));
      return model;
    },
  },
  mounted() {},
};
</script>