<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- batchInputShape  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="batchInputShape"
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
            >batchInputShape ((null | number)[]) <br /><br />If defined, will be
            used to create an input layer to insert before this layer. If both
            inputShape and batchInputShape are defined, batchInputShape will be
            used. This argument is only applicable to input layers (the first
            layer of a model).</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "batchInputShape",
  data: () => ({
    parameterData: {},
    parameterName: "batchInputShape",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
