<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- padding  -->
      <v-col cols="9">
        <v-select
            v-model="value"
            :items="padding_list"
            label="padding"
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
          >padding ('valid'|'same'|'causal') <br /><br />Padding mode.</span
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
    padding_list: ["valid", "same", "causal"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
