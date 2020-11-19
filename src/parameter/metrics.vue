<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- metrics  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="metrics"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-tooltip bottom max-width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
            </v-icon>
          </template>
          <span
            >metrics (string|LossOrMetricFn|Array| {[outputName: string]: string
            | LossOrMetricFn}) <br /><br />List of metrics to be evaluated by
            the model during training and testing. Typically you will use
            metrics=['accuracy']. To specify different metrics for different
            outputs of a multi-output model, you could also pass a
            dictionary.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "metrics",
  data: () => ({
    parameterData: {},
    parameterName: "metrics",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
