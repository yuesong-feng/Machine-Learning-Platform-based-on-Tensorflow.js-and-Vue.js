<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- batchSize  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="batchSize"
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
            >batchSize (number) <br /><br />
            If inputShape is specified and batchInputShape is not specified,
            batchSize is used to construct the batchInputShape: [batchSize,
            ...inputShape]</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "batchSize",
  data: () => ({
    parameterData: {},
    parameterName: "batchSize",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
