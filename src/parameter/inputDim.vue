<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!--        inputDim-->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="inputDim"
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
            >inputDim (number) <br /><br />If specified, defines inputShape as
            [inputDim].</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "inputDim",
  data: () => ({
    parameterData: {},
    parameterName: "inputDim",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
