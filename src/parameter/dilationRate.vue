<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- dilationRate  -->
      <v-col cols="3">
        <v-text-field
          v-model="value"
          label="dilationRate "
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-tooltip bottom max-width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
            </v-icon>
          </template>
          <span
            >dilationRate (number|[number]|[number, number]|[number, number,
            number]) <br /><br />The dilation rate to use for the dilated
            convolution in each dimension. Should be an integer or array of two
            or three integers. <br /><br />Currently, specifying any
            dilationRate value != 1 is incompatible with specifying any strides
            value != 1.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "dilationRate",
  data: () => ({
    parameterData: {},
    parameterName: "dilationRate",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
