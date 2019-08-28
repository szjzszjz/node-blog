const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const query = ctx.query
    ctx.body = {
        errm: 0,
        query,
        data:[123,33]
    }
})

module.exports = router
