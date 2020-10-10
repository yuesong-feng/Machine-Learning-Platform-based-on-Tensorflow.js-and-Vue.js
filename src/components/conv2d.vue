<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">conv2d</v-list-item-title>

        <v-list-item-subtitle>this is conv2d</v-list-item-subtitle>
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
    return {
      childmsg:'我是子组件的值'
    };
  },
  methods: {
    remove() {
      //向父组件传递一个空参数，让父组件执行remove方法
      this.$emit("remove");
    },
    index() {
      this.$emit("count");
    },
  },
  mounted(){
    this.$emit('getmsg', this.childmsg)
  }
};
</script>
