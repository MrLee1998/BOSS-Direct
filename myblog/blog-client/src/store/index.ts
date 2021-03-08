import { context } from 'ant-design-vue/lib/vc-image/src/PreviewGroup'
import { createStore } from 'vuex'
import { getBlog } from '../../axios/interface/getBlog'
import { register } from '../../axios/interface/register'
// interface blogProps {
//   _id: string
//   title: string
//   content: string
//   tag: string
//   time: string
// }
// interface GlobalDataProps {
//   blogData: blogProps[]
// }

interface Register {
  email: string
  nickName: string
  password: string
}
export default createStore<any> ({
  state: {
    blogData: [],
    updateBlog: {},
    registerMassage: '',
    hideLogin: true
  },
  mutations: {
    // 获取所有
    async getBlogData(state) {
      const data = await getBlog('/getBlog', {}).then(res => res)
      // console.log(data);
      state.blogData = data
    },
    // 根据类别获取
    async getDiffBlog(state, type) {
      const data:any = await getBlog('/getBlog', {}).then(res => res)
      let newArr:any = []
      data.forEach((item:any) => {
        if(item.tag === type) {
          newArr.push(item)
        }
      })
      state.blogData = newArr
      // console.log(newArr);
    },
    //  修改内容
    async updateBlog(state, id) {
      const data = await getBlog('/getBlog', {
        id: id
      }).then(res => res)
      // console.log(data);
      state.updateBlog = data
    },
    async register1 (state, data:Register) {
      let result:any =  await register('/register', data).then(res => res)
      console.log(result.message);   
      state.registerMassage = result.message
    },
    chageHideLogin(state) {
      state.hideLogin = !state.hideLogin
    }
  },
  actions: {
    async register (context, register1) {
      setTimeout(() => {
        context.commit(register1)
      }, 1000)
    }
  },
  modules: {
  },
  getters: {
    getBlogData: (state) => {
      return (state.blogData)
    },
    getUpdateBlog: (state) => {
      return (state.updateBlog)
    },
    getRegisterMassage: (state) => {
      return (state.registerMassage)
    },
    getHideLogin: (state) => {
      return (state.hideLogin)
    }
  }
})
