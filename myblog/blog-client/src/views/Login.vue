<template>
  <div class="login">
    <img
      src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00410-4150.jpg"
      alt=""
    />
    <div class="login-content">
      <a-form class="form">
        <a-form-item label="账号" v-bind="validateInfos.email">
          <a-input placeholder="请输入账号" v-model:value="modelRef.email" />
        </a-form-item>
        <a-form-item label="密码" v-bind="validateInfos.password">
          <a-input placeholder="请输入密码" v-model:value="modelRef.password" />
        </a-form-item>
        <a-form-item class="btn">
          <a-button type="primary" @click.prevent="onSubmit">登录</a-button>
          <a-button style="margin-left: 10px" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
      <div class="foot-btn">
        <div class="goToHome" @click="goToHome">返回首页</div>
        <div class="goToRegister" @click="goToRegister">立即注册</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useForm } from "@ant-design-vue/use";
import { useRouter } from "vue-router";
import { login } from "../../axios/interface/login";
import { setLocal, getLocal } from "../utils/util";
import { useStore } from "vuex";
interface Data {
  email: string;
  password: string;
}
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore()
    const modelRef = reactive<Data>({
      email: "",
      password: "",
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive({
        email: [
          {
            required: true,
            message: "Please input email",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input sub name",
          },
        ],
      })
    );
    const onSubmit = () => {
      validate()
        .then(async (res) => {
          console.log(res);
          await login("/login", {
            email: res.email,
            password: res.password,
          }).then((res: any) => {
            let message: string = res.message;
            let code: number = res.code;
            let userId:string = res.data.userId
            if (code == 1) {
              setLocal('userId', userId)
              setTimeout(() => {
                router.push("/");
                alert(message);
              },100)               
            } else {
              return alert(message);
            }
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    const reset = () => {
      resetFields();
    };
    const goToHome = () => {
      router.push("/");
    };
    const goToRegister = () => {
      router.push("/register");
    };
    return {
      validateInfos,
      reset,
      modelRef,
      onSubmit,
      goToHome,
      goToRegister,
    };
  },
});
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  img {
    width: 100%;
    height: 100%;
  }
  .login-content {
    background-color: rgb(223, 213, 213);
    width: 400px;
    height: 400px;
    // padding-left: 50%;
    border-radius: 5px;
    transform: translate(-100px, -200px);
    position: fixed;
    top: 50%;
    left: 50%;
    padding-left: 70px;
    padding-top: 40px;
    .foot-btn {
      display: flex;
      .goToHome {
        flex: 1;
        cursor: pointer;
      }
      .goToRegister {
        flex: 1;
        cursor: pointer;
      }
    }
  }
  .form {
    .btn {
      padding-left: 60px;
    }
    .a-form-item {
      width: 100px;
    }
  }
}
</style>

