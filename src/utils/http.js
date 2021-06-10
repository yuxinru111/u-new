import axios from 'axios'
import Vue from 'vue'
import router from '../router'

// 全局url配置
axios.defaults.baseURL = 'http://localhost:3000/api'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 获取localStorage里面的对象
  let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
  config.headers.authorization = userInfo.token
  return config
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 如果获取时间受限 进行判断  当数据码为403的时候

  if(response.data.code==403){
     router.push('/login')
  }
  return response.data
})

// 挂载
Vue.prototype.$http = axios

// 导出
export default axios
