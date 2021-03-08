<template>
  <div class="login">
    <img
      src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00410-4150.jpg"
      alt=""
    />
    <div class="login-content">
      <a-form class="form">
        <a-form-item label="邮箱" v-bind="validateInfos.email">
          <a-input v-model:value="modelRef.email" />
        </a-form-item>
        <a-form-item label="昵称" v-bind="validateInfos.nickName">
          <a-input v-model:value="modelRef.nickName" />
        </a-form-item>
        <a-form-item label="密码" v-bind="validateInfos.password">
          <a-input v-model:value="modelRef.password" />
        </a-form-item>
        <a-form-item label="重复密码" v-bind="validateInfos.Repassword">
          <a-input v-model:value="modelRef.Repassword" />
        </a-form-item>
        <a-form-item class="btn">
          <a-button type="primary" @click.prevent="onSubmit">注册</a-button>
          <a-button style="margin-left: 10px" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
      <div class="foot-btn">
        <div class="goToHome" @click="goToHome">返回首页</div>
        <div class="goToRegister" @click="goToLogin">立即登录</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw } from "vue";
import { useForm } from "@ant-design-vue/use";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

interface Data {
  email: string
  nickName: string
  password: string
  Repassword: string
}
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore()
    const modelRef = reactive<Data>({
      email: '',
      nickName: '',
      password: '',
      Repassword: ''
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive({
        email: [
          {
            required: true,
            message: "Please input name",
          }
        ],
        nickName: [
          {
            required: true,
            message: "Please input nickName",
          }
        ],
        password: [
          {
            required: true,
            message: "Please input password",
          },
        ],
        Repassword: [
          {
            required: true,
            message: "Please input password",
          }
        ]
      })
    );
    const onSubmit = () => {
      validate()
        .then((res) => {
          // console.log(res, toRaw(modelRef));
          store.commit('register1', res)
          setTimeout(() => {
            if(store.getters.getRegisterMassage == '用户名已注册') {
              return alert('用户名已注册')
            } else {
              alert('注册成功')
              return router.push('/login')
            }
          },100)
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
    const goToLogin = () => {
      router.push('/login')
    }
    return {
      validateInfos,
      reset,
      modelRef,
      onSubmit,
      goToHome,
      goToLogin
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
  }
  .ant-form-item-required {
    padding-left: 20px;
  }
}
</style>

