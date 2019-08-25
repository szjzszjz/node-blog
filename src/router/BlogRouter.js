const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/BlogController");

const { SuccessModel, ErrorModel } = require("../model/ResModel");

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];
    const id = req.query.id;

    //获取博客列表
    if (method === "GET" && path === "/api/blog/list") {
        const author = req.query.autor || "";
        const keyword = req.query.keyword || "";
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);

        const promise = getList(author, keyword);
        return promise.then(listData => {
            return new SuccessModel(listData)
        })

    }
    //获取博客详情
    if (method === "GET" && path === "/api/blog/detail") {
        const id = req.query.id || "";
        const promise = getDetail(id);
        return promise.then(detail => {
            return new SuccessModel(detail)
        })
    }
    //新建博客 
    if (method === "POST" && path === "/api/blog/new") {
        const blogdata = newBlog(req.body);
        return blogdata.then(data => {
            return new SuccessModel(data);
        })
    }

    //更新博客
    if (method === "POST" && path === "/api/blog/update") {
        const blog = updateBlog(req.query.id, req.body);
        return blog.then(updateBlog => {
            if (updateBlog) {
                return new SuccessModel(true)
            }else{
                return new ErrorModel('更新失败')
            }
        })
    }
    //删除博客
    if (method === "POST" && path === "/api/blog/delete") {
        const blog = deleteBlog(req.query.id);
        return blog.then(deleteBlog => {
            if (deleteBlog) {
                return new SuccessModel(true)
            }else{
                return new ErrorModel('删除失败')
            }
        })
    }
}
module.exports = handleBlogRouter