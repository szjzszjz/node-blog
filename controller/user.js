const { exec, escape } = require('../db/mysql')
const { ErrorModel , SuccessModel} = require('../model/resModel')
const { genPassword } = require('../utils/cryp')



//用户登录
const login = async (username, password) => {

    //利用escape防止sql注入
    password = genPassword(password)
    console.log('login password=', password);

    username = escape(username)
    password = escape(password)

    const sql = `select username , realname from user where username = ${username} and password = ${password};`

    const result = await exec(sql)
    console.log('sql=', sql, result);
    return result

    // promise 语法 异步函数
    // return exec(sql).then((result) => {
    //     console.log('sql=',sql,result);

    //     if (result) {
    //         return result[0]
    //     }
    //     return null
    // })
}

const register = async (username, password) => {
    //利用escape防止sql注入
    password = genPassword(password)
    console.log('register password=', password);

    username = escape(username)
    password = escape(password)

    //判断用户是否已存在
    const justsql = `select username from user where username = ${username}`
    const justResult = await exec(justsql)
    console.log('justResult=', justResult);
    if (justResult !== null && justResult.length > 0) {
        return new ErrorModel('该用户名已经存在!')
    }

    const sql = `insert into user(username, password, realname) values(${username}, ${password}, ${username});`
    const result = await exec(sql)
    console.log('sql=', sql, result['affectedRows']);
    if (result['affectedRows'] > 0) {
        return new SuccessModel('注册成功')
    }else{
        return new ErrorModel('注册失败')
    }

}

module.exports = {
    login,
    register
}