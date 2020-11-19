<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- loss  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="loss"
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
            >loss (string|string[]|{[outputName: string]:
            string}|LossOrMetricFn| LossOrMetricFn[]|{[outputName: string]:
            LossOrMetricFn}) <br /><br />Object function(s) or name(s) of object
            function(s). If the model has multiple outputs, you can use a
            different loss on each output by passing a dictionary or an Array of
            losses. The loss value that will be minimized by the model will then
            be the sum of all individual losses.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "loss",
  data: () => ({
    parameterData: {},
    parameterName: "loss",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
