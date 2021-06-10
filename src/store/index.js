import Vuex from 'vuex'
import Vue from 'vue'

// 导入子模块
import menu from '../store/moudles/menu'
import role from '../store/moudles/role'
import user from './moudles/user'
import cate from './moudles/cate'
import specs from './moudles/specs'
import goods from './moudles/goods'
import banner from './moudles/banner'
import seck from './moudles/seck'
import member from './moudles/member'


// 注册
Vue.use(Vuex)
// 创建实例化对象
let store = new Vuex.Store({
  // 存储数据
  state: {

  },
  //   唯一改变state数据
  mutations: {

  },
  //   存储异步请求数据方法
  actions: {


  },
  //   相当于计算属性
  getters: {

  },
  modules: {
    menu,
    role,
    user,
    cate,
    specs,
    goods,
    banner,
    seck,
    member
  }
})
// 导出
export default store
