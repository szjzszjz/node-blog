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
    req.session = {}
    req.sessionId = Math.random() *10
    const { username, password } = req.body
    // if (req.cookie){
    //   console.log(req.cookie.sessionId)
    // }
    const isLogin = login(username, password)
    // const isLogin = login(obj.username, obj.password)
    return isLogin.then((result) => {
      if (result) {
        //设置session
        console.log(result.username);

        console.log(req.sessionId);
        req.session.username = result.username
        req.session.realname = result.realname
        console.log(req.session);
        // 同步到redis
        set(req.sessionId, req.session)
        // res.cookie('sessionId', 1, {maxAge: 60 * 1000})
        return new SuccessModel('登录成功')
      }
      return new ErrorModel("用户名密码错误！")
    })
  }
}

module.exports = handleUserRouter
