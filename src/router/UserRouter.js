const { login } = require('../controller/UserController')
const querystring = require('querystring')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { set } = require('../db/Redis')

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const obj = querystring.parse(url.split('?')[1])

  //获取博客列表
  if (method === 'POST' && path === '/api/user/login') {
    console.log('/api/user/login--', req.body);
    
    const { username, password } = req.body
    const isLogin = login(username, password)
    // const isLogin = login(obj.username, obj.password)
    return isLogin.then((result) => {
      if (result) {
        //设置session
        req.session.username = result.username
        req.session.realname = result.realname
        // 同步到redis
        set(req.sessionId, req.session)
        return new SuccessModel('登录成功')
      }
      return new ErrorModel("用户名密码错误！")
    })
  }
}

module.exports = handleUserRouter