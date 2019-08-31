const { exec, escape } = require('../db/mysql')
const { ErrorModel } = require('../model/resModel')
const { genPassword } = require('../utils/cryp')



//用户登录
const login = async (username, password) => {

    //利用escape防止sql注入
    password = genPassword(password)
    console.log('password=', password);

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

module.exports = {
    login
}