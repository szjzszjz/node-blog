var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', loginCheck, function (req, res, next) {
    let keyword = req.query.keyword || ''
    author = req.session.username
    const promise = getList(author, keyword);
    return promise.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/detail', loginCheck, (req, res, next) => {
    if (req.query.id === undefined) {
        res.json(
            new ErrorModel('id不能为空')
        )
        return
    }
    const promise = getDetail(req.query.id)
    return promise.then(detail => {
        res.json(
            new SuccessModel(detail)
        )
    })
})

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    if (req.query.id !== undefined) {
        const result = updateBlog(req.query.id, req.body)
        result.then(data => {
            if (data) {
                res.json(
                    new SuccessModel('更新成功！')
                )
            } else {
                res.json(
                    new ErrorModel('更新失败！')
                )
            }
        })
    } else {
        res.json(
            new ErrorModel('id 不能为空')
        )
    }
})

router.post('/delete', loginCheck, (req, res, next) => {
    if (req.query.id !== undefined) {
        const result = deleteBlog(req.query.id, req.session.username)
        return result.then(data => {
            if (data) {
                res.json(
                    new SuccessModel('删除成功！')
                )
            } else {
                res.json(
                    new ErrorModel('删除失败！')
                )
            }
        })
    } else {
        res.json(
            new ErrorModel('id 不能为空')
        )
    }
})


module.exports = router;
