import Vue from 'vue'
import Router from 'vue-router'
import {
  Message
} from 'element-ui'

let Layout = () => import('../page/Layout')
let Login = () => import('../page/Login')
let Menu = () => import('../page/Menu/Index')
let Home = () => import('../page/Home/Index')
let Role = () => import('../page/Role/Index')
let User = () => import('../page/User/Index')
let Cate = () => import('../page/Cate/Index')
let Specs = () => import('../page/Specs/Index')
let Goods = () => import('../page/Goods/Index')
let Banner = () => import('../page/Banner/Index')
let Seck = () => import('../page/Seck/Index')
let Member = () => import('../page/Member/Index')


Vue.use(Router)
// 解决跳转到登录页报错问题，重复点击导航
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

let router = new Router({
  routes: [{
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{

          path: '/home',
          component: Home,
          meta: {
            title: '主页'
          }
        },
        {

          path: '/menu',
          component: Menu,
          meta: {
            title: '菜单'
          },
        },
        {

          path: '/role',
          component: Role,
          meta: {
            title: '角色'
          },

        },
        {

          path: '/admin',
          component: User,
          meta: {
            title: '管理员'
          },

        },
        {

          path: '/category',
          component: Cate,
          meta: {
            title: '商品分类'
          },

        },
        {

          path: '/specs',
          component: Specs,
          meta: {
            title: '商品规格'
          },

        },
        {

          path: '/goods',
          component: Goods,
          meta: {
            title: '商品管理'
          },

        },
        {

          path: '/banner',
          component: Banner,
          meta: {
            title: '轮播图管理'
          },

        },
        {

          path: '/seckill',
          component: Seck,
          meta: {
            title: '秒杀活动'
          },

        },
        {

          path: '/member',
          component: Member,
          meta: {
            title: '会员管理'
          },

        },
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      },
    },

  ]
})
// 全局前置守卫 点击跳转文档题变
router.beforeEach((to, from, next) => {
  // 判断localStoorage是否有缓存
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (to.path != '/login') {
    if (!userInfo.token) {
      return next('/login')
    }
  }
  // 判断是否有路由权限
  console.log(userInfo.menus_url);
  if (to.path != '/login' && to.path != '/home') {
    if (userInfo.menus_url.indexOf(to.path) == -1) {
      // 弹窗
      Message({
        message: '滚',
        type: 'error'
      })
      // 跳转到home页
      return next('/home')
    }
  }
  document.title = to.meta.title + '小U商城'
  next()
})


export default router
