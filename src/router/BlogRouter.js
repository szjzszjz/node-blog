const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/BlogController");
const { SuccessModel, ErrorModel } = require("../model/ResModel");

//  统一的验证登录函数
const loginCheck = (req) => {
  if (!req.session) {
    // if (req.session.username) {
    // }
    return Promise.resolve(
      new ErrorModel('请先登录')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  const id = req.query.id;

  //获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
   

    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    // 查看是否是管理員鄧麗
    // if (req.query.isadmin) {
      // const loginCheckResult = loginCheck(req)
      // if (loginCheckResult) {
      //   // 登录失败
      //   return loginCheckResult
      // }
      //登录成功
    //   author = req.session.username
    // }
    const promise = getList(author, keyword);
    return promise.then(listData => {
      return new SuccessModel(listData)
    })

  }
  //获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {

    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //     return loginCheckResult
    // }
    const id = req.query.id || "";
    const promise = getDetail(id);
    return promise.then(detail => {
      return new SuccessModel(detail)
    })
  }
  //新建博客 
  if (method === "POST" && path === "/api/blog/new") {

    // const loginCheckResult = loginCheck(req)
    // //未登录
    // if (loginCheckResult) {
    //     return loginCheckResult
    // }
    console.log('/api/blog/new--', req.body);

    // req.body.author = req.session.username
    const blogdata = newBlog(req.body);
    return blogdata.then(data => {
      return new SuccessModel(data);
    })
  }

  //更新博客
  if (method === "POST" && path === "/api/blog/update") {

    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //     return loginCheckResult
    // }

    // req.body.author = req.session.username
    const blog = updateBlog(req.query.id, req.body);
    return blog.then(updateBlog => {
      if (updateBlog) {
        return new SuccessModel(true)
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }
  //删除博客
  if (method === "POST" && path === "/api/blog/delete") {

    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //     return loginCheckResult
    // }

    // req.body.author = req.session.username
    const blog = deleteBlog(req.query.id, req.body);
    return blog.then(deleteBlog => {
      if (deleteBlog) {
        return new SuccessModel(true)
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }
}
module.exports = handleBlogRouter