import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
 

// import axios from 'axios'
const app = createApp(App)

app.use(ElementPlus)
// app.config.globalProperties.$axios = axios;

app.use(store).use(router).use(Antd).mount('#app')
