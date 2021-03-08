import axios  from '../http' // axios是被封装的

interface Data {
  email: string
  nickName: string;
  password: string;
}

export function register(url: string, data: Data) {
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