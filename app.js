const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONFIG } = require('./config/db')

const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// morgan
const env = process.env.ENV
if (env === 'dev') {
    // 开发环境 测试环境
    app.use(morgan('dev'));
} else {
    // 生产环境
    const logFileName = path.join(__dirname,'logs','access.log')
    const writeStream = fs.createWriteStream(logFileName, {flags:'a'})
    app.use(morgan('combined', {
        stream: writeStream
    }));
}

app.keys = ['*node-blog*']
app.use(session({
    // 配置cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 20
    },
    //配置redis
    store: redisStore({
        all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
    })
}))

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
