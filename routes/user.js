const router = require('koa-router')()

router.prefix('/api/user')

router.get('/login', async function (ctx, next) {

    const {username ,password} = ctx.request.body
    ctx.body = {
        errm: 0,
        username,
        password
    }
})

module.exports = router
