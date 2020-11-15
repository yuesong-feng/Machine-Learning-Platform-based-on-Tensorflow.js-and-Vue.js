<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- biasRegularizer  -->
      <v-col cols="9">
        <v-text-field
            v-model="value"
            label="biasRegularizer"
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
          >biasRegularizer ('l1l2'|string|Regularizer)
              <br /><br />Regularizer function applied to the bias vector.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "biasRegularizer",
  data:()=>({
    parameterData: {},
    parameterName: "biasRegularizer",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>