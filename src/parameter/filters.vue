<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- filters -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="filters"
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
            >filters (number) <br /><br />The dimensionality of the output space
            (i.e. the number of filters in the convolution).</span
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
    parameterName: "filters",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
