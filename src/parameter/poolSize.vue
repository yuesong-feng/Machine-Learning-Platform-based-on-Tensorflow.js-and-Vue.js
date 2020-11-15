<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- poolSize -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="poolSize"
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
            >poolSize (number|[number, number]) <br /><br />Factors by which to
            downscale in each dimension [vertical, horizontal]. Expects an
            integer or an array of 2 integers. <br /><br />For example, [2, 2]
            will halve the input in both spatial dimension. If only one integer
            is specified, the same window length will be used for both
            dimensions.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "poolSize",
  data: () => ({
    parameterData: {},
    parameterName: "poolSize",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
