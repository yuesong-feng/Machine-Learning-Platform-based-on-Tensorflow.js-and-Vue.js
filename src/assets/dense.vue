<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">dense</span>
        </v-card-title>
      </template>
      <span
        >Creates a dense (fully connected) layer. <br />This layer implements
        the operation: output = activation(dot(input, kernel) + bias)
        <br />activation is the element-wise activation function passed as the
        activation argument. <br />kernel is a weights matrix created by the
        layer. <br />bias is a bias vector created by the layer (only applicable
        if useBias is true). <br />Input shape:* <br />nD tf.Tensor with shape:
        (batchSize, ..., inputDim). <br />The most common situation would be a
        2D input with shape (batchSize, inputDim). <br />Output shape:* <br />nD
        tensor with shape: (batchSize, ..., units). <br />For instance, for a 2D
        input with shape (batchSize, inputDim), the output would have shape
        (batchSize, units). <br />Note: if the input to the layer has a rank
        greater than 2, then it is flattened prior to the initial dot product
        with the kernel.</span
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
import units from "@/parameter/units";
import activation from "@/parameter/activation";
import useBias from "@/parameter/useBias";
import kernelInitializer from "@/parameter/kernelInitializer";
import biasInitializer from "@/parameter/biasInitializer";
import inputDim from "@/parameter/inputDim";
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
export default {
  components: {
    units,
    activation,
    useBias,
    kernelInitializer,
    biasInitializer,
    inputDim,
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
      'units',
      'activation',
      'useBias',
      'kernelInitializer',
      'biasInitializer',
      'inputDim',
      'kernelConstraint',
      'biasConstraint',
      'kernelRegularizer',
      'biasRegularizer',
      'activityRegularizer',
      'inputShape',
      'batchInputShape',
      'batchSize',
      'dtype',
      'name',
      'trainable',
      'weights',
      'inputDType',
    ],
    allParameters: [],
    layerData: {},
  }),
  methods: {
    addParameter(layerName) {
      this.allParameters.push({
        name: layerName,
      });
    },
    removeParameter() {
      this.allParameters.pop();
    },
    removeLayer() {
      this.$emit("remove", "");
    },
    sendData() {
      for (let i = 0; i < this.$refs.Parameters.length; i++) {
        this.$refs.Parameters[i].sendData();
        for (let key in this.$refs.Parameters[i].parameterData) {
          this.layerData[key] = this.$refs.Parameters[i].parameterData[key];
        }
      }
    },
  },
  mounted() {},
};
</script>
