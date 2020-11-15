<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- dtype  -->
      <v-col cols="9">
        <v-select
          v-model="value"
          :items="dtype_list"
          label="dtype"
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
            >dtype ('float32'|'int32'|'bool'|'complex64'|'string')
            <br /><br />The data-type for this layer. Defaults to 'float32'.
            This argument is only applicable to input layers (the first layer of
            a model).</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "dtype",
  data: () => ({
    parameterData: {},
    parameterName: "dtype",
    value: "",
    dtype_list: ["float32", "int32", "bool", "complex64", "string"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
