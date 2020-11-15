<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- kernelSize -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="kernelSize"
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
            >kernelSize (number|number[]) <br /><br />The dimensions of the
            convolution window. If kernelSize is a number, the convolutional
            window will be square.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "filters",
  data: () => ({
    parameterData: {},
    parameterName: "kernelSize",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
