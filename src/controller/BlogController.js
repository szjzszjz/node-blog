const getList = (author , keyworld) => {
  return [
    {
      id: 01,
      title: "标题1",
      content: "内容1",
      createTime: 1566640860249,
      author: '张三'
    },
    {
      id: 02,
      title: "标题2",
      content: "内容3",
      createTime: 1566640908537, 
      author: '李四'
    }
  ]
}

const getDetail = (id) => {
  return {
      id: 01,
      title: "标题1",
      content: "内容1",
      createTime: 1566640860249,
      author: '张三'
    }
}

const newBlog = (blogData = {}) => {
  console.log('new blog', blogData)
  return {
    id: 01
  }
}
const updateBlog = (id ,blogData = {}) => {
  return true
}
const deleteBlog = (id, blogData = {}) => {
 return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}