const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {

    const { username, password } = ctx.request.body
    const result = await login(username, password)
    if (result !== null && result.length > 0) {
        const user = result[0]
        ctx.session.username = user.username
        ctx.session.realname = user.realname
        ctx.body = new SuccessModel(user, '登陆成功!')
    } else {
        ctx.body = new ErrorModel('用户名或者密码错误!')
    }
})

// router.get('/session-test', async function (ctx, next) {
//     if (ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++
//     ctx.body = {
//         errno: 0,
//         viewCount: ctx.session.viewCount
//     }
// })

module.exports = router
