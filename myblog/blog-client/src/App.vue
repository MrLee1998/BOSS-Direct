<template>
  <div class="app">
    <div class="head">
      <BlogHeader></BlogHeader>
    </div> 
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
  
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BlogHeader from "./components/blogHeader.vue";
import login from "./views/Login.vue";

export default defineComponent({
  components: {
    BlogHeader,
    login
  },
});
</script>
<style lang="less">
.app {
  display: flex;
  height: 100%;
  flex-direction: row;
  // position: fixed;

  .head {
    background: #f8f8f8;
    flex: 3;
  }
  .container {
    flex: 7;
    width: 100%;
    height: 100%;
  }
}
</style>
