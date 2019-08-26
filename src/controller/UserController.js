const { exec } = require('../db/Mysql')
const { ErrorModel } = require('../model/ResModel')

const login = (username, password) => {
  const sql = `select username , realname from user where username = '${username}' and password = '${password}';`
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