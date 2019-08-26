//环境参数
const env = process.env.NODE_ENV
console.log('env--',env);

let MYSQL_CONFIG = {}
let REDIS_CONFIG = {}

// if (env === 'env') {

MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'node-blog'
}
REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
}
// }

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'node-blog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}
