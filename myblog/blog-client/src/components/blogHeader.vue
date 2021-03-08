<template>
  <div class="blog-header">
    <div class="avatar-box">
      <a-tooltip>
        <template #title v-if="!t">点击前请登录哦</template>
        <img @click="goToEditBlogData" class="img" src="http://static.hdslb.com/images/akari.jpg" />
      </a-tooltip>
      
    </div>
    <div class="title">
      <span>慵懒少年</span>
    </div>
    <div class="dsc">
      <span>一个前端小菜鸟</span>
    </div>
    <div class="home-icon home-icon-change" @click="goHome">
      <HomeFilled />
    </div>
    <div class="class-box">
      <div
        class="setting decration"
        v-for="item in writeType"
        :key="item"
        @click="writeBlog(item)"
      >
        <a>{{ item }}</a>
      </div>
    </div>
    <div class="communication">
      <a-tooltip>
        <template #title>github</template>
        <a href="https://github.com/MrLee1998" target="_blank">
          <GithubOutlined :style="{ fontSize: '26px', color: '#08c' }" />
        </a>
      </a-tooltip>
      <a-tooltip>
        <template #title>leetcode</template>
        <a href="https://leetcode-cn.com/" target="_blank">
          <img class="leetcode" src="../assets/leetcode.png" alt="" />
        </a>
      </a-tooltip>
      <a-tooltip>
        <template #title>掘金</template>
        <a href="https://leetcode-cn.com/" target="_blank">
          <img class="leetcode" src="../assets/juejin.png" alt="" />
        </a>
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import {  defineComponent, toRefs, onBeforeMount, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { HomeFilled, GithubOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { getLocal, deleteLocal } from '../utils/util'

interface State {
  writeType: string[]
}
export default defineComponent({
  components: {
    HomeFilled,
    GithubOutlined,
  },
  setup() {
    const store = useStore();
    const state = reactive<State>({
      writeType: [ "面试题", "记事本", "日记"],
    });
    const t = computed<string | null>(() => getLocal('userId'))
    const router = useRouter();
    const goHome = () => {
      router.push("/home");
    };
    const writeBlog = (item: string) => {
      console.log(item);
      store.commit("getDiffBlog", item);  
    };


    const goToEditBlogData = () => {
      let getUserId = getLocal('userId')
      if(getUserId) {
        router.push('/writeBlog')
      }      
    }
    const exit = () => {
      alert('确认退出？')
      deleteLocal('userId')
    }
    const login = () => {
      router.push('/login')
    }
    const register = () => {
      router.push('/register')
    } 
    onBeforeMount(()=> {    
    })
    return {
      ...toRefs(state),
      goHome,
      writeBlog,
      goToEditBlogData,
      login,
      register,
      exit,
      t
    };
  },
});
</script>

<style lang="less" scope>
.blog-header {
  cursor: pointer;
  height: 100vh;
  .avatar-box {
    background: #f8f8f8;
    padding-top: 150px;
    text-align: center;
    img {
      width: 80px;
      border-radius: 50%;
    }
    .img:hover {
      transform: rotate(360deg) scale(2);
      transition: 1.5s;
    }
  }
  .title {
    padding-top: 50px;
    text-align: center;
    font-family: kaiti;
    font-size: 18px;
  }
  .dsc {
    // padding-top: 50px;
    text-align: center;
    font-family: kaiti;
    font-size: 13px;
  }
  .home-icon {
    text-align: center;
    // justify-content: center;
    margin: auto;
    line-height: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
  .home-icon-change:hover {
    transform: scale(1.2);
    transition: 1.5s;
    color: pink;
  }
  .class-box {
    text-align: center;
    margin: 10px auto;
    .decration {
      font-size: 18px;
      color: pink;
    }
  }
  .communication {
    text-align: center;
    .leetcode {
      width: 25px;
      margin-bottom: 8px;
      margin-left: 8px;
    }
  }
}
</style>