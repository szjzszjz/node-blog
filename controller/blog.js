const { exec } = require('../db/mysql')
const xss = require('xss')

// 查詢博客列表
const getList = async (author, keyword) => {
    let sql = `select * from blog where 1=1 `
    console.log(author, keyword)
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 通过await 获取promise里面的resolve 直接返回 
    return await exec(sql)
}

// 获取博客详情
const getDetail = async (id) => { 
    let sql = `select * from blog `
    if (id) {
        sql += `where id = '${id}' `
    } 
    return await exec(sql)
}

//新增博客
const newBlog =async  (blogData = {}) => {
    console.log('new blog', blogData)
    const author = blogData.author
    // 预防xss攻击
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const categories = blogData.categories
    const createTime = Date.now()
    const sql = `insert into blog (title, content, author, createtime, categories) 
    values('${title}', '${content}', '${author}', '${createTime}', '${categories}');`

    const insertDate = await exec(sql)
    return {
        id: insertData.insertId
    }

    // promise 语法
    // return await exec(sql).then(insertData => {
    //     console.log('insertData is', insertData);
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
    console.log('update blog', id, blogData)
    const author = blogData.author
    const title = blogData.title
    const content = blogData.content
    const categories = blogData.categories
    const sql = `update blog set author = '${author}', title = '${title}', content = '${content}' , categories = '${categories}' where id = '${id}';`

    const updateData = await exec(sql)
    console.log('updateData is', updateData)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
    
    // promise 语法
    // return await exec(sql).then(updateData => {
    //     console.log('updateData is', updateData)
    //     if (updateData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}

// 删除博客
const deleteBlog = async (id, author) => {
    const sql = `delete from blog where id = '${id}' and author = '${author}' `

    const deleteData = await exec(sql)
    if (deleteData.affectedRows > 0) {
        return true
    }
    return false

    // promise 语法
    // return await exec(sql).then(deleteData => {
    //     console.log('deleteData is', deleteData)
    //     if (deleteData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}