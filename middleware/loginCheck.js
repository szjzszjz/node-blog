// 登录中间件
const { ErrorModel } = require('../model/resModel')

// koa2 语法
module.exports = async (ctx, next) => {
    console.log('logigncheck');
    
    if (ctx.session.username !== undefined) {
        console.log('logigncheck1');
        await next()
        return
    }
    console.log('logigncheck2');
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