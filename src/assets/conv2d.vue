<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-title>conv2d</v-card-title>

    <v-card-actions>
      <v-row>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="items"
            label="Outlined style"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-btn color="error" @click="remove">
            remove
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
  methods: {
    remove() {
      this.$emit("remove", "");
    },
  },
  mounted() {},
};
</script>
