<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">flatten</span>
        </v-card-title>
      </template>
      <span
        >Flattens the input. Does not affect the batch size.<br /><br />

        A Flatten layer flattens each batch in its inputs to 1D (making the
        output 2D).<br />
        For example:<br /><br />
        const input = tf.input({shape: [4, 3]});<br />
        const flattenLayer = tf.layers.flatten();<br />
        // Inspect the inferred output shape of the flatten layer, which<br />
        // equals `[null, 12]`. The 2nd dimension is 4 * 3, i.e., the result of
        the<br />
        // flattening. (The 1st dimension is the undermined batch size.)<br />
        console.log(JSON.stringify(flattenLayer.apply(input).shape));<br />
      </span>
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
import batchInputShape from "@/parameter/batchInputShape";
import batchSize from "@/parameter/batchSize";
import dataFormat from "@/parameter/dataFormat.vue";
import dtype from "@/parameter/dtype";
import inputDType from "@/parameter/inputDType";
import inputShape from "@/parameter/inputShape";
import name from "@/parameter/name";
import trainable from "@/parameter/trainable";
import weights from "@/parameter/weights";
import * as tf from "@tensorflow/tfjs";
export default {
  components: {
    batchInputShape,
    batchSize,
    dataFormat,
    dtype,
    inputDType,
    inputShape,
    name,
    trainable,
    weights,
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
      "batchInputShape",
      "batchSize",
      "dataFormat",
      "dtype",
      "inputDType",
      "inputShape",
      "name",
      "trainable",
      "weights",
    ],
    allParameters: [],
    layerData: { layerName: "flatten" },
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
      model.add(tf.layers.flatten(args));
      return model;
    },
  },
  mounted() {},
};
</script>
