<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- useBias  -->
      <v-col cols="9">
        <v-select
            v-model="value"
            :items="useBias_list"
            label="useBias "
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
          >useBias (boolean) <br /><br />Whether the layer uses a bias
              vector. Defaults to true.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "useBias",
  data:()=>({
    parameterData: {},
    parameterName: "useBias",
    value: "",
    useBias_list: ["true", "false"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
}
</script>