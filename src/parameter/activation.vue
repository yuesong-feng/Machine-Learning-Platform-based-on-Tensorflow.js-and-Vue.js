<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- activation  -->
      <v-col cols="9">
        <v-select
          v-model="value"
          :items="activation_list"
          label="activation "
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
            >activation ('elu'|'hardSigmoid'|'linear'|'relu'|'relu6'|
            'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh')
            <br /><br />Activation function of the layer. <br /><br />If you
            don't specify the activation, none is applied.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "activation",
  data: () => ({
    parameterData: {},
    parameterName: "activation",
    value: "",
    activation_list: [
      "elu",
      "hardSigmoid",
      "linear",
      "relu",
      "relu6",
      "selu",
      "sigmoid",
      "softmax",
      "softplus",
      "softsign",
      "tanh",
    ],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
