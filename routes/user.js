const express = require('express')
const router = express.Router()
const {login} = require('../controller/user')
const { SuccessModel, ErrorModel} = require('../model/resModel')

router.post('/login', (req, res, next) => {
    const { username , password } = req.body
    const result = login(username,password)
    return result.then(data => {
        if (data) {
            // 自动将session的数据放入redis
            req.session.username = data.username
            req.session.realname = data.realname
            
            res.json(
                new SuccessModel('登录成功')    
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
})

router.get('/login-text', (req, res, next) => {
    if (req.session.username) {
        res.json({
            msg: 'seccessfull'
        })
        return
    }
    res.json({
        msg: 'fail'
    })
})

module.exports = router