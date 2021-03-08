import axios from '../http' // axios是被封装的

interface Data {
  id: string
}
export function deleteBlog(url: string, data: Data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        let result:number = res.data.code
        resolve(result)
      }, err => {
        reject(err)
      })
  })
}