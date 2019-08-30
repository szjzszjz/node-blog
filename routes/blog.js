const router = require('koa-router')()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', loginCheck, async (ctx, next) => {
    let keyword = ctx.query.keyword || ''
    author = ctx.session.username
    const listData = await getList(author, keyword);
    console.log('listData=', listData);
    
    ctx.body = new SuccessModel(listData)


    // let keyword = req.query.keyword || ''
    // author = req.session.username
    // const promise = getList(author, keyword);
    // return promise.then(listData => {
    //     res.json(
    //         new SuccessModel(listData)
    //     )
    // })
})

router.get('/detail', loginCheck, async (ctx, next) => {
    const id = ctx.query.id
    if (id === undefined) {
        ctx.body = new ErrorModel('id不能为空')
        return
    }
    const detail = await getDetail(id)
    ctx.body = new SuccessModel(detail)
})

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    body.author = ctx.session.username
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})


router.post('/update', loginCheck, async (ctx, next) => {
    const id = ctx.query.id
    const body = ctx.request.body

    if (id !== undefined) {
        const data = await updateBlog(id, body)
        if (data) {
            ctx.body = new SuccessModel('更新成功！')
        } else {
            ctx.body = new ErrorModel('更新失败！')
        }
    } else {
        ctx.body = new ErrorModel('id 不能为空')
    }
})

router.post('/delete', loginCheck, async (ctx, next) => {
    if (ctx.query.id !== undefined) {
        const data = await deleteBlog(ctx.query.id, ctx.session.username)
        if (data) {
            ctx.body = new SuccessModel('删除成功！')
        } else {
            ctx.body = new ErrorModel('删除失败！')
        }
    } else {
        ctx.body = new ErrorModel('id 不能为空')
    }
})


module.exports = router
