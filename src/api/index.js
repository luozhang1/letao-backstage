// 验证用户登陆
import axios from 'axios'
const baseURL = 'http://127.0.0.1:3000/'
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 什么是基准url:我们的请求就是路由名称，但是这个路由要基于服务器，设置基准路径的目的就是能够先找到对应的服务器，再匹配它里面设置的路由
axios.defaults.baseURL = baseURL
// 允许axios传递cookie数据，因为默认情况下，axios并不会传递cookie

axios.defaults.withCredentials = true
/// employee/employeeLogin
// 登录
export const login = (params) => {
  return axios.post('employee/employeeLogin', params)
    .then((result) => {
      return result.data
    })
}
// 判断是否登录/employee/checkRootLogin
export const getlogin = (params) => {
  return axios.get('/employee/checkRootLogin', params)
    .then((result) => {
      return result.data
    })
}

/// user/queryUser
// 获取用户数据
export const getUser = (pa) => {
  return axios.get('user/queryUser', {params: pa})
    .then((result) => {
      return result.data
    })
}
// 获取用户登录状态/user/updateUser
export const getupdateUser = (pa) => {
  return axios.post('/user/updateUser', {params: pa})
    .then((result) => {
      return result.data
    })
}
// 获取商品分类/category/queryTopCategoryPaging
export const getcategory = (pa) => {
  return axios.get('/category/queryTopCategoryPaging', {params: pa})
    .then((result) => {
      return result.data
    })
}
// 二级分类数据/category/querySecondCategoryPaging
export const getcategorySecond = (pa) => {
  return axios.get('/category/querySecondCategoryPaging', {params: pa})
    .then((result) => {
      return result.data
    })
}
// 获取商品数据/product/queryProductDetailList
export const ProductDetail = (pa) => {
  return axios.get('/product/queryProductDetailList', {params: pa})
    .then((result) => {
      return result.data
    })
}
// 添加一级分类/category/addTopCategory
export const getAddcategory = (pa) => {
  return axios.post('/category/addTopCategory', pa)
    .then((result) => {
      return result
    })
}
// 添加二级分类/category/addSecondCategory
export const addSecond = (pa) => {
  return axios.post('/category/addSecondCategory', pa)
    .then((result) => {
      return result
    })
}
// 添加图片接口 /category/addSecondCategoryPic
export const addPic = (pa) => {
  return axios.post('/category/addSecondCategoryPic', pa)
    .then((result) => {
      return result
    })
}
// 商品新增/product/addProduct
export const addProduct = (pa) => {
  return axios.post('/product/addProduct', pa)
    .then((result) => {
      return result
    })
}
// 用户是否启用/user/updateUser
export const getupdate = (pa) => {
  return axios.post('/user/updateUser', pa)
    .then((result) => {
      return result
    })
}
