<template>
  <v-col cols="3">
    <v-sheet rounded="lg">
      <v-list>
        <v-list-group
          v-for="item in group"
          :key="item.name"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.layers"
            :key="child.name"
            link
            @click="addLayer(child.name)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-sheet>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    group: [
      {
        name: "Dataset",
        layers: [{ name: "MNIST" }],
      },
      {
        name: "Basic",
        layers: [
          { name: "activation" },
          { name: "dense" },
          { name: "dropout" },
          { name: "embedding" },
          { name: "flatten" },
          { name: "permute" },
          { name: "repeatVector" },
          { name: "reshape" },
          { name: "upSampling2d" },
        ],
      },
      {
        name: "Convolution",
        layers: [
          { name: "conv1d" },
          { name: "conv2d" },
          { name: "conv2dTranspose" },
          { name: "conv3d" },
          { name: "cropping2D" },
          { name: "depthwiseConv2d" },
          { name: "separableConv2d" },
          { name: "upSampling2d" },
        ],
      },
      {
        name: "Pooing",
        layers: [{ name: "maxPooling2d" }],
      },
      {
        name: "LayersModel",
        layers: [{ name: "compile" }],
      },
    ],
  }),
  methods: {
    addLayer(name) {
      this.$emit("add", name);
    },
  },
};
</script>
