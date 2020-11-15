<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- weights  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="weights"
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
            >weights (tf.Tensor[]) <br /><br />Initial weight values of the
            layer.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "weights",
  data: () => ({
    parameterData: {},
    parameterName: "weights",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
