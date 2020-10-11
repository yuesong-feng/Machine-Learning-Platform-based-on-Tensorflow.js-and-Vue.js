<template>
  <v-col cols="2">
    <v-sheet rounded="lg">
      <v-list color="transparent">
        <v-list-item
          v-for="layer in layers"
          :key="layer"
          link
          @click="addlayer(layer)"
        >
          <v-list-item-content>
            <v-list-item-title> {{ layer }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item link color="grey lighten-4">
          <v-list-item-content>
            <v-list-item-title>
              Refresh
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    layers: ["conv2d", "Messages", "Profile", "Updates"],
  }),
  methods: {
    addlayer(layer) {
      alert(layer);
    },
  },
};
</script>

<style></style>
