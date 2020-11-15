<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- strides -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="strides"
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
            >strides (number|[number, number]) <br /><br />The size of the
            stride in each dimension of the pooling window. Expects an integer
            or an array of 2 integers. Integer, tuple of 2 integers, or None. If
            null, defaults to poolSize.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "strides",
  data: () => ({
    parameterData: {},
    parameterName: "strides",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
