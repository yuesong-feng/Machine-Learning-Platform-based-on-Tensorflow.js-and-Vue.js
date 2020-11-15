<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">MNIST</span>
        </v-card-title>
      </template>
      <span>MNIST</span>
    </v-tooltip>
  </v-card>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
    sendData() {},
  },
  mounted() {},
};
</script>
