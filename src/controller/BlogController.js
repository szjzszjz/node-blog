const { exec } = require('../db/Mysql')
const xss = require('xss')

const getList = (author, keyword) => {
    let sql = `select * from blog where 1=1 `
    console.log(author, keyword)
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blog `
    if (id) {
        sql += `where id = '${id}' `
    } else {
        throw console.error('id 不能为空');
    }
    return exec(sql)
}

const newBlog = (blogData = {}) => {
    console.log('new blog', blogData)
    const author = blogData.author
    // 预防xss攻击
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const categories = blogData.categories
    const createTime = Date.now()
    const sql = `insert into blog (title, content, author, createtime, categories) 
    values('${title}', '${content}', '${author}', '${createTime}', '${categories}');`

    return exec(sql).then(insertData => {
        console.log('insertData is', insertData);
        return {
            id: insertData.insertId
        }

    })
}
const updateBlog = (id, blogData = {}) => {
    console.log('update blog', id, blogData)
    const author = blogData.author
    const title = blogData.title
    const content = blogData.content
    const categories = blogData.categories
    const sql = `update blog set author = '${author}', title = '${title}', content = '${content}' , categories = '${categories}' where id = '${id}';`

    return exec(sql).then(updateData => {
        console.log('updateData is', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}


const deleteBlog = (id, blogData) => {
    const sql = `delete from blog where id = '${id}'`
    return exec(sql).then(deleteData => {
        console.log('deleteData is', deleteData)
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
