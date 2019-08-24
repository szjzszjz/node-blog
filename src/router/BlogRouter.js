const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/BlogController')

const { SuccessModel, ErrorModel } = require('../model/ResModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const id = req.query.id

  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.autor || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const id = req.query.id || ''
    if (id) {
      const detail = getDetail(id)
      return new SuccessModel(detail)
    } else {
      return new ErrorModel('id 为空')
    }
  }
  //新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blogdata = newBlog(req.body)
    return new SuccessModel(blogdata)
  }
  //更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    const blog = updateBlog(id, req.body)
    if (!blog) {
      return new ErrorModel('更新失败！')
    }
    console.log('更新博客')
    return new SuccessModel(blog)
  }
  //删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    const blog = deleteBlog(id, req.body)
    if (!blog) {
      return new ErrorModel('删除失败！')
    }
    console.log('删除博客')
    return new SuccessModel(blog)
  }
}

module.exports = handleBlogRouter