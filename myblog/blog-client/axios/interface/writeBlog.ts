import axios from '../http' // axios是被封装的

interface Data {
  id?: string
  title: string
  content: string
  tag: string,
  time: string
}

export function writeBlog(url: string, data: Data) {
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