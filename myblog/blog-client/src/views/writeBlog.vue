<template>
  <div class="write-blog">
    <div class="tile">数据管理页面</div>
    <div class="container" v-if="data">
      <div class="container-box">
        <div>题目</div>
        <div>类型</div>
        <div>时间</div>
        <div>操作</div>
      </div>
      <div class="container-box" v-for="item in data" :key="item._id">
        <div>{{item.title}}</div>
        <div>{{item.tag}}</div>
        <div>{{item.time}}</div>
        <div class="btn">
          <a>查看</a>
          <a @click="updateItem(item._id)">修改</a>
          <a @click="deleteItem(item._id)">删除</a>
        </div>
      </div>
    </div>
    <div class="no-data"  v-else>
      <a-empty/>
    </div>
    <button class="writeBtn" @click="goToWrite">写博客</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { deleteBlog } from "../../axios/interface/deleteBlog";

interface Data {
  _id: string
  title: string
  content: string
  tag: string
  time: string
}
export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const data:any = computed(() => store.getters.getBlogData);

    onBeforeMount(() => {
      store.commit("getBlogData");
    });

    const goToWrite = () => {
      router.push("/edit");
    }

    const deleteItem = (id:string) => {
      console.log(id);
      deleteBlog('/deleteBlog', {
        id: id
      }).then(res => {
        if (res === 1) {
          return store.commit("getBlogData");
        }  
      })
    }

    const updateItem = (id:string) => {
      console.log(id);
      store.commit('updateBlog', id)
      let res = store.getters.getUpdateBlog
      router.push({name: 'edit', query: {id: id, res: res.title}})
    }
    return {
      data,
      goToWrite,
      deleteItem,
      updateItem
    };
  },
});
</script>

<style lang="less" scoped>
.write-blog {
  margin: 10px;
  .tile {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 10px 10px 5px #888888;
    background: #f6f6f6;
  }
  .container {
    .container-box {
      margin: 10px;
      display: flex;
      background: #f5f5f5;
      div {
        flex: 1;
        margin: 5px;
      }
      .btn {
        a {
          margin-right: 5px;
        }
      }
    }
  }
  .no-data {
    padding-top: 50%;
  }
  .writeBtn {
    margin-left: 40%;
  }
}
</style>