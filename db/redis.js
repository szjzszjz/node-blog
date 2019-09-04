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
module.exports = redisClient