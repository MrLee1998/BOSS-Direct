import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
// import config from './config'

let loading: any
interface options {
  lock: boolean;
  text: string;
  background: string;
}
const startLoading = () => {
  let options: options = {
    lock: true,
    text: '加载中···',
    background: 'rgba(0, 0, 0, 0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close()
}

axios.defaults.baseURL = 'http://localhost:3000'
//  请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 加载
  startLoading()
  return config
})

//  响应拦截
axios.interceptors.response.use((response: AxiosResponse<any>) => {
  // 清除加载
  endLoading()
  return response
}, error => {
  //  错误提示
  endLoading()
  return Promise.reject(error)
})

export default axios

// interface Data {
//   userId: string
//   nickName: string;
//   password: string;
// }

// export function post(url: string, data: Data) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err)
//       })
//   })
// }


// interface Data {
//   userId: string
//   nickName: string;
//   password: string;
// }


// export default function $axios(url: string, method: string, data: Data) {
//   axios.interceptors.request.use((config: AxiosRequestConfig) => {
//     // 加载
//     startLoading()
//     return config
//   })

//   //  响应拦截
//   axios.interceptors.response.use((response: AxiosResponse<any>) => {
//     // 清除加载
//     endLoading()
//     return response
//   }, error => {
//     //  错误提示
//     endLoading()
//     return Promise.reject(error)
//   })

//   interface Data {
//     userId: string
//     nickName: string;
//     password: string;
//   }
// }
