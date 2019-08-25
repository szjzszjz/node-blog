//环境参数
const env = process.env.NODE_ENV

let MYSQL_CONFIG

if(env === 'env'){
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'node-blog'
    }
}

if(env === 'production'){
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'node-blog'
    }
}

module.exports = {
    MYSQL_CONFIG
}
