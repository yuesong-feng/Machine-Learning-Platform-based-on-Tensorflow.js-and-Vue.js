<template>
  <v-col cols="4">
    <v-row no-gutters>
    <!-- dataFormat  -->
    <v-col cols="9">
      <v-select
        v-model="value"
        :items="dataFormat_list"
        label="dataFormat"
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
          >dataFormat ('channelsFirst'|'channelsLast') <br /><br />Format of the
          data, which determines the ordering of the dimensions in the inputs.
          <br /><br />channels_last corresponds to inputs with shape (batch,
          ..., channels) <br /><br />channels_first corresponds to inputs with
          shape (batch, channels, ...). <br /><br />Defaults to
          channels_last.</span
        >
      </v-tooltip>

    </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "dataFormat",
  data: () => ({
    parameterData: {},
    parameterName: "dataFormat",
    value: "",
    dataFormat_list: ["channelsFirst", "channelsLast"],
  }),
  methods: {
    sendData() {
      this.parameterData[this.parameterName] = this.value;
    },
  },
};
</script>
