const { exec, escape } = require('../db/Mysql')
const { ErrorModel } = require('../model/ResModel')
const { genPassword } = require('../util/cryp')

const login = (username, password) => {

  //利用escape防止sql注入
  username = escape(username)
  password = genPassword(password)
  console.log('password=', password);

  password = escape(password)
  const sql = `select username , realname from user where username = ${username} and password = ${password};`
  return exec(sql).then((result) => {
    console.log(sql);

    if (result) {
      return result[0]
    }
    return null
  })
}

module.exports = {
  login
}