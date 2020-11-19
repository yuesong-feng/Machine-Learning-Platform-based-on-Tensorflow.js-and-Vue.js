<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">compile</span>
        </v-card-title>
      </template>
      <span
        >Configures and prepares the model for training and evaluation.
        Compiling outfits the model with an optimizer, loss, and/or metrics.
        Calling fit or evaluate on an un-compiled model will throw an error.
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
import optimizer from "@/parameter/optimizer";
import loss from "@/parameter/loss";
import metrics from "@/parameter/metrics";
export default {
  components: {
    optimizer,
    loss,
    metrics,
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
    parameters: ["optimizer", "loss", "metrics"],
    allParameters: [],
    layerData: { layerName: "compile" },
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
  },
  mounted() {},
};
</script>
