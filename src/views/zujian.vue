<template>
 <div class="home">
  <div class="container">
   <span>我是组件1</span>
   <span class="del" @click="del">删除组件</span>
  </div>
 </div>
</template>
<script>
export default {
 data() {
  return {};
 },
 methods: {
  del() {
   // 子组件向父组件传值（此处传递一个空值） - 父组件将执行getContent方法
   this.$emit('func','')
  }
 }
};
</script>