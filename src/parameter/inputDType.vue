<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- inputDType  -->
      <v-col cols="9">
        <v-select
          v-model="value"
          :items="inputDType_list"
          label="inputDType"
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
            >inputDType ('float32'|'int32'|'bool'|'complex64'|'string')
            <br /><br />Legacy support. Do not use for new code.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "inputDType",
  data: () => ({
    parameterData: {},
    parameterName: "inputDType",
    value: "",
    inputDType_list: ["float32", "int32", "bool", "complex64", "string"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
