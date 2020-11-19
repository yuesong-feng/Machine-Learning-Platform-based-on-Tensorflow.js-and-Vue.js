<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- optimizer  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="optimizer"
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
            >optimizer (string|tf.train.Optimizer) <br /><br />An instance of
            tf.train.Optimizer or a string name for an Optimizer.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "optimizer",
  data: () => ({
    parameterData: {},
    parameterName: "optimizer",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
