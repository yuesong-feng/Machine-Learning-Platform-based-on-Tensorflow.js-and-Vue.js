<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          OVERLINE
        </div>
        <v-list-item-title class="headline mb-1">
          Headline 5
        </v-list-item-title>
        <v-list-item-subtitle
          >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text @click="index">
        index
      </v-btn>
      <v-btn outlined rounded text @click="remove">
        remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    remove() {
      //向父组件传递一个空参数，让父组件执行remove方法
      this.$emit("remove");
    },
    index(){
      this.$emit("count");
    }
  },
};
</script>
