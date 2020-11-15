<template>
  <v-col cols="4">
    <v-row no-gutters>
      <!-- name  -->
      <v-col cols="9">
        <v-text-field
          v-model="value"
          label="name"
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
          <span>name (string) <br /><br />Name for this layer.</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "name",
  data: () => ({
    parameterData: {},
    parameterName: "name",
    value: "",
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
