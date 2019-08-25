const { exec } = require('../db/Mysql')

const login = (username, password) => {
    const sql = `select username , realname from user where username = '${username}' and password = '${password}';`
    return exec(sql).then((result) => {
        console.log( result[0]);
        
        return result[0]
    })
}

module.exports = {
    login
}