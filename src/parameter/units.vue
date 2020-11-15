<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!--        units-->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="units"
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
            >units (number) <br /><br />Positive integer, dimensionality of the
            output space.</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "units",
  data: () => ({
    parameterData: {},
    parameterName: "units",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
