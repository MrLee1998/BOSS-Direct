<template>
  <div class="not-found" @click="goBack">
    <img src="../assets/notfound.jpg" alt="点击返回">
  </div>
</template>

<script lang="ts">import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }
    return {
      goBack
    }
  }
})
</script>>

<style lang="less" scoped>
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>