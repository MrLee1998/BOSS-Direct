<template>
  <div class="edit">
    <div class="nav">博客</div>
    <div class="write-box">
      <div class="head">
        <div class="title">标题:<input v-model="title" type="text" /></div>
        <div class="tag">
          类别:<a-select
            v-model:value="tag"
            style="width: 120px"
            @focus="focus"
            ref="select"
          >
            <a-select-option value="面试题">面试题</a-select-option>
            <a-select-option value="记事本">记事本</a-select-option>
            <a-select-option value="日记">日记</a-select-option>
          </a-select>
        </div>
      </div>
      <a-textarea v-model:value="content" placeholder="写点什么呢" :rows="8" />
      <button class="btn" @click="submitAll">提交</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { writeBlog } from "../../axios/interface/writeBlog";
import { getTime } from "../utils/getTime";

export default defineComponent({
  components: {},

  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    let title = ref<string>("");
    let content = ref<string>("");
    let tag = ref<string>("");
    onBeforeMount(async() => {
      setTimeout( async() => {
        let res = await store.getters.getUpdateBlog
        title.value = res.title
        content.value = res.content
        tag.value = res.tag
      }, 100)    
    });

    const submitAll = () => {
      let temp: string = title.value;
      let res:string = tag.value
      let id:any = route.query.id
      if(temp.length <= 0 || content.value.length <= 0 || res.length <= 0) {
        return alert('写完整哦!')     
      }
      writeBlog("/writeBlog", {
        title: temp,
        content: content.value,
        tag: res,
        time: getTime(),
        id: id
      }).then((res) => {
        console.log(res);
        router.push('/writeBlog')
      });
    };
    return {
      // ...toRefs(content),
      submitAll,
      content,
      tag,
      title
    };
  },
});
</script>

<style lang="less" scoped>
.edit {
  background: #f6f6f6;
  height: 100%;
  margin: 10px;
  font-family: kaiti;
  .nav {
    font-size: 40px;
    font-weight: bold;
  }
  .write-box {
    width: 100%;
    text-align: center;
    .head {
      display: flex;
      margin: 10px;
      justify-content: space-between;
    }
    input {
      border-radius: 5px;
      margin-left: 10px;
      width: 200px;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
    }
    .btn {
      margin: 10px;
      width: 80px;
    }
  }
}
</style>