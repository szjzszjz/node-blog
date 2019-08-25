const querystring = require('querystring')
const handleUserRouter = require('./src/router/UserRouter')
const handleBlogRouter = require('./src/router/BlogRouter')

// 用于处理post data

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {

        if (req.method !== 'POST') {
            resolve({})
            return
        }
        console.log('getPostData01', req.headers['Content-type'])

        // if (req.headers['Content-type'] !== 'application/json') {
        //   resolve({})
        //   return
        // }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }

            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = ((req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    getPostData(req).then((postData) => {
        req.body = postData


        // 处理blog路由
        // const blogData = handleBlogRouter(req, res)

        // if (blogData) {
        //   console.log('blogData',blogData)
        //   res.end(
        //     JSON.stringify(blogData)
        //   )
        //   return
        // }

        const promise = handleBlogRouter(req, res)
        if (promise) {
            promise.then(blogData => {
                console.log(blogData['data']);
                res.end(
                    JSON.stringify(blogData)
                )
                return
            })
        }

        // 处理User路由
        const loginResult = handleUserRouter(req, res)
        if (loginResult) {
            loginResult.then(user => {
                res.end(
                    JSON.stringify(user)
                )
                return
            })
        }

        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }

        // 处理未命中路由
        // res.writeHead(404, { 'Content-type': 'text/plain' })
        // res.write('404 not found \n')
        // res.end()
    })



    console.log('OK')
})

module.exports = serverHandle