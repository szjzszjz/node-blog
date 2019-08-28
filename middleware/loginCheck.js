// 登录中间件
const { ErrorModel } = require('../model/resModel') 

module.exports = (req, res , next) => {
    if (req.session.username !== undefined) {
        next()
        return
    }
    res.json(
        new ErrorModel('未登录')
    )
}