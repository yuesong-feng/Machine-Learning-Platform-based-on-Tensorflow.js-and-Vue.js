<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- kernelConstraint  -->
      <v-col cols="9">
        <v-select
            v-model="value"
            :items="kernelConstraint_list"
            label="kernelConstraint  "
            dense
            outlined
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-tooltip bottom max-width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" v-bind="attrs" v-on="on"
            >mdi-chat-alert-outline
            </v-icon>
          </template>
          <span
          >kernelConstraint
              ('maxNorm'|'minMaxNorm'|'nonNeg'|'unitNorm'|string|tf.constraints.Constraint)
              <br /><br />Constraint for the convolutional kernel weights.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "kernelConstraint",
  data: () => ({
    parameterData: {},
    parameterName: "kernelConstraint",
    value: "",
    kernelConstraint_list: ["maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>