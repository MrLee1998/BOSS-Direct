// const passport = require('../utils/passport')
const { v1: uuidv1 } = require('uuid')
// const config = require('../../config')
const User_col = require('../models/user')
const Password_col = require('../models/password')


// 登录
const login = async (ctx) => {
  let req = ctx.request.body
  // console.log(req);
  // 连接数据库， 去数据库查找是否存在该条数据
  //查找语句
  // 获取用户的userId
  const user = await User_col.findOne({
    email: req.email
  })
  if (!user) {
    ctx.status = 200
    ctx.body = {
      code: 0,
      message: '账号不存在'
    }
    return
  }

  // 找的到账号
  const userId = user.userId
  // 查找密码
  const pwd = await Password_col.findOne({
    userId
  },{
    password: 1
  })
  console.log(pwd);
  let match = pwd.password === req.password ? true : false
  ctx.status = 200
  console.log(match);
  if (match) {
    ctx.body = {
      code: 1,
      message: '登陆成功',
      data: user
    }
    return;
  }
  ctx.body = {
    code: 0,
    message: '密码错误'
  }
}

// 注册
const register = async (ctx) => {
  let req = ctx.request.body
  const user = await User_col.findOne({
    email: req.email
  })
  ctx.status = 200
  if (user) {
    ctx.body = {
      code: 0,
      message: '用户名已注册'
    }
    return;
  }
  // 插入新用户
  const userId = uuidv1()
  const newUser = await User_col.create({
    userId,
    email: req.email,
    nickName: req.nickName
  })
  if (newUser) {
    // 密码的插入
    const result = await Password_col.create({
      userId: userId,
      password: req.password
    })
    // console.log(result);
    if (result) {
      ctx.body = {
        code: 1,
        message: '注册成功',
        data: {
          userId: newUser.userId,
          email: newUser.email
        }
      }
    }
  }

}
//  登录
// const login = async (ctx) => {
//   let res = ctx.request.body
//   let email = res.email
//   let password = res.password
//   console.log(email);
//   console.log(password);
//   const user = await User_col.findOne({
//     email: email
//   })
//   if (user.userId !== null) {
//     const pwd = await User_col.findOne({
//       password: password
//     })
//     if (pwd.userId !== null) {
//       if (pwd.userId == user.userId) {
//         ctx.body = {
//           code: 1,
//           message: 'success',
//           data: user
//         }
//         return
//       }
//     }
//   } else {
//     ctx.body = {
//       code: 1,
//       message: 'success',
//       data: user
//     }
//     return
//   }

// }

// // 注册
// const register = async (ctx) => {
//   let res = ctx.request.body
//   let email = res.email
//   let nickName = res.nickName
//   let password = res.password
//   const user = await User_col.findOne({
//     email: email
//   })
//   if (user == null) {
//     const userId = uuidv1()
//     const newUser = await User_col.create({
//       userId: userId,
//       email: email,
//       nickName: nickName,
//       password: password
//     })
//     ctx.body = {
//       code: 1,
//       message: 'success',
//       data: newUser
//     }
//   } else {
//     ctx.body = {
//       code: 1,
//       message: '用户名已注册',
//       data: user
//     }
//   }
// }
module.exports = {
  login,
  register
}