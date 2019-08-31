// 登录中间件
const { ErrorModel } = require('../model/resModel')

// koa2 语法
module.exports = async (ctx, next) => {
    if (ctx.session.username !== undefined) {
        console.log('验证通过');
        await next()
        return
    }
    console.log('验证未通过');
    ctx.body = new ErrorModel('未登录')
}

// express promise 语法
// module.exports = async (req, res , next) => {
//     if (req.session.username !== undefined) {
//         next()
//         return
//     }
//     res.json(
//         new ErrorModel('未登录')
//     )
// }