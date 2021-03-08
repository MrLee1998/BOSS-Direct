<template>
  <div class="home">
    <div class="header">
      <div class="tips">
        有待更新
      </div>
      <div class="login-register">
        <a @click="login" v-if="!t">登录</a>
        <a @click="exit" v-if="t">退出</a>
        <a @click="register"> 注册</a>
      </div>
    </div>
    <div class="container big" v-for="item in blogData" :key="item._id">
      <a-timeline>
        <a-timeline-item>
          <div class="blog-title">{{ item.title }}</div>
          <text style="white-space: pre-wrap;">{{ item.content }}</text>
        </a-timeline-item>
        <div class="time-box">
          <img src="../assets/time.png" alt="" />
          {{ item.time }}
        </div>
        <div class="tags">
          <a-tag color="pink">{{ item.tag }}</a-tag>
        </div>
      </a-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
// import { onBeforeMount } from "vue";
import { getTime } from "../utils/getTime";
import { getBlog } from "../../axios/interface/getBlog";
import { useStore } from "vuex";
// import BScroll from "better-scroll";
import { getLocal, deleteLocal } from '../utils/util'


interface Data {
  _id: string;
  title: string;
  content: string;
  tag: string;
  time: string;
}
export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    let time = computed<string>(() => {
      return getTime();
    });
    const t = computed<string | null>(() => getLocal('userId'))
    const gologin = () => {
      router.push("/login");
    };

    const getBlogData = async () => {
      const data: any = await getBlog("/getBlog", {}).then((res) => {
        return res;
      });
      return data;
    };
    onBeforeMount(() => {
      store.commit("getBlogData");
      // const bs = new BScroll(".wrapper", {
      //   pullUpLoad: true,
      //   scrollbar: true,
      //   pullDownRefresh: true,
      //   // and so on
      // });
    });

    const blogData = computed(() => store.getters.getBlogData);

    const exit = () => {
      alert('确认退出？')
      deleteLocal('userId')
      router.push('/login')
    }
    const login = () => {
      router.push('/login')
    }
    const register = () => {
      router.push('/register')
    } 
    return {
      gologin,
      time,
      blogData,
      exit,
      login,
      register,
      t
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  // height: 100%;
  overflow: hidden;
  background-image: url('../assets/bg.jpg');
  .header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    // padding-left: 90%;
    line-height: 50px;
    .login-register {
      margin-right: 20px;
    }
    .tips {
      color: #f6f6f6;
      margin-left: 20px;
      font-size: 20px;
      font-family: kaiti;
    }
  }
  .container {
    padding: 10px;
    margin: 30px;
    width: 90%;
    background: rgb(202, 199, 199);
    box-shadow: 10px 10px 5px #888888;
    border-radius: 5px;
    .blog-title {
      font-size: 20px;
      padding-bottom: 5px;
    }
    .time-box {
      img {
        width: 20px;
      }
    }
    .tags {
      float: right;
      border-radius: 5px;
    }
  }
  .big:hover {
    transform: scale(1.05);
    // font-size: 26px;
    transition: 0.5s;
  }
}
</style>