const {REDIS_CONFIG} = require('../config/db')
const redis = require('redis')

const redisClient = redis.createClient(
    REDIS_CONFIG.port,
    REDIS_CONFIG.host,
    redis.print
)
redisClient.on('error', err => {
    console.error(err);
})

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }

            try {
                // 如果是json格式的对象就转换为json
                resolve(JSON.parse(val))
            } catch (ex) {
                // 否则按原型返回
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}
