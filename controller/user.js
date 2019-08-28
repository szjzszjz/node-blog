const { exec, escape } = require('../db/mysql')
const { ErrorModel } = require('../model/resModel')
const { genPassword } = require('../utils/cryp')




const login = (username, password) => {

    //利用escape防止sql注入
    password = genPassword(password)
    console.log('password=', password);

    username = escape(username)
    password = escape(password)

    const sql = `select username , realname from user where username = ${username} and password = ${password};`
    return exec(sql).then((result) => {
        console.log('sql=',sql);

        if (result) {
            return result[0]
        }
        return null
    })
}

module.exports = {
    login
}