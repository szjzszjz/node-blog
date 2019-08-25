const { REDIS_CONFIG } = require('../config/Db')
const redis = require('redis')

const redidClient = redis.createClient(
    REDIS_CONFIG.port,
    REDIS_CONFIG.host,
    redis.print
)
redidClient.on('error', err => {
    console.error(err);
})