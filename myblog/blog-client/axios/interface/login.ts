// import axios  from '../http' // axios是被封装的

import axios from '../http'
interface Data {
  email: string
  password: string;
}

export function login(url: string, data: Data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        let result = res.data
        resolve(result);
      }, err => {
        reject(err)
      })
  })
}