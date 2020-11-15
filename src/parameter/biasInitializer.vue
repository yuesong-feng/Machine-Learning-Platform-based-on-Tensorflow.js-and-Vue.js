<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- biasInitializer  -->
      <v-col cols="9">
        <v-select
            v-model="value"
            :items="biasInitializer_list"
            label="biasInitializer "
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
          >biasInitializer
              ('constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'|
              'leCunNormal'|'leCunUniform'|'ones'|'orthogonal'|'randomNormal'|
              'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string|tf.initializers.Initializer)
              <br /><br />Initializer for the bias vector.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "biasInitializer",
  data: () => ({
    parameterData: {},
    parameterName: "biasInitializer",
    value: "",
    biasInitializer_list: [
      "constant",
      "glorotNormal",
      "glorotUniform",
      "heNormal",
      "heUniform",
      "identity",
      "leCunNormal",
      "leCunUniform",
      "ones",
      "orthogonal",
      "randomNormal",
      "randomUniform",
      "truncatedNormal",
      "varianceScaling",
      "zeros",
    ],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>