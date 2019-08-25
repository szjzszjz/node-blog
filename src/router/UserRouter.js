const { login } = require('../controller/UserController')
const querystring = require('querystring')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const obj = querystring.parse(url.split('?')[1])

    //获取博客列表
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        const isLogin = login(username, password)
        // const isLogin = login(obj.username, obj.password)
        return isLogin.then((result) => {
            if (result) {
                return new SuccessModel('登录成功')
            }else{
                return new ErrorModel("用户名密码错误！")
            }
        })
    }
}

module.exports = handleUserRouter