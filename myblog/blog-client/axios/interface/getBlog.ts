import axios from '../http' // axios是被封装的

interface Data {
  id?: string
}

interface Result {
  code: number
  massage: string
  data: Data
}
export function getBlog(url: string, data: Data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        if(res) {
          let result:Data = res.data.data
          resolve(result);
        }
      }, err => {
        reject(err)
      })
  })
}