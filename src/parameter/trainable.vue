<template>
  <v-col cols="4">
    <v-row no-gutters>
  <!-- trainable  -->
  <v-col cols="9">
    <v-select
        v-model="value"
        :items="trainable_list"
        label="trainable"
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
      >trainable (boolean) <br /><br />Whether the weights of this layer
              are updatable by fit. Defaults to true.</span
      >
    </v-tooltip>
  </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
name: "trainable",
  data:()=>({
    parameterData: {},
    parameterName: "trainable",
    value: "",
    trainable_list: ["true", "false"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
}
</script>