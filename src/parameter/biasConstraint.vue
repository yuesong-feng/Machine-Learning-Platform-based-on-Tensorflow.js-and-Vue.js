<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- biasConstraint  -->
      <v-col cols="9">
        <v-select
            v-model="value"
            :items="biasConstraint_list"
            label="biasConstraint  "
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
          >biasConstraint
              ('maxNorm'|'minMaxNorm'|'nonNeg'|'unitNorm'|string|tf.constraints.Constraint)
              <br /><br />Constraint for the bias vector.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "biasConstraint",
  data: () => ({
    parameterData: {},
    parameterName: "biasConstraint",
    value: "",
    biasConstraint_list: ["maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>