var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// 使用morgean 记录日志
var logger = require('morgan');
const fs = require('fs')
const session = require('express-session')

//将session存储在redis中
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const env = process.env.ENV
if (env === 'dev') {
    // 开发环境 测试环境
    app.use(logger('dev'));
} else {
    // 生产环境
    const logFileName = path.join(__dirname,'logs','access.log')
    const writeStream = fs.createWriteStream(logFileName, {flags:'a'})
    app.use(logger('combined', {
        stream: writeStream
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const sessionStore = new RedisStore({
    client: redisClient
})
// 设置session cookie
app.use(session({
    secret: '*node-blog*',
    cookie: {
        // path: '/', // 默认设置
        // httpOnly: true,  //默认设置
        maxAge: 0.5 * 60 * 60 * 1000 //毫秒 一天
    },
    store: sessionStore
}))
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
