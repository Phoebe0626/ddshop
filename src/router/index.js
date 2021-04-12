import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import store from '../store'

Vue.use(VueRouter)

// 路由懒加载 - 二级路由
const Home = () => import('../views/Home')
const Category = () => import('../views/Category')
const Eat = () => import('../views/Eat')
const Cart = () => import('../views/Cart')
const My = () => import('../views/My')

// My-Children
const UserCenter = () => import('../views/My/Children/UserCenter.vue')
const ChangeName = () => import('../views/My/Children/ChangeName.vue')
const MyOrder = () => import('../views/My/Children/MyOrder.vue')
const Coupon = () => import('../views/My/Children/Coupon.vue')
const MyAddress = () => import('../views/My/Children/Address/MyAddress.vue')
const AddAddress = () => import('../views/My/Children/Address/AddAddress.vue')
const EditAddress = () => import('../views/My/Children/Address/EditAddress.vue')
const GoodsDetail = () => import('../views/GoodsDetail')
const Order = () => import('../views/Order')
// 登录页
const Login = () => import('../views/Login')

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [{
      path: '/dashboard',
      redirect: '/dashboard/home',
      meta: {
        keepAlive: true
      }
    }, {
      path: 'home',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true
      }
    }, {
      path: 'category',
      name: 'category',
      component: Category,
      meta: {
        keepAlive: true
      }
    }, {
      path: 'eat',
      name: 'eat',
      component: Eat,
      meta: {
        keepAlive: true
      }
    }, {
      path: 'cart',
      name: 'cart',
      component: Cart,
      meta: {
        keepAlive: true
      }
    }, {
      path: 'my',
      name: 'my',
      component: My,
      children: [{
        path: 'userCenter',
        name: 'userCenter',
        component: UserCenter,
        children: [{
          path: 'changeName',
          name: 'changeName',
          component: ChangeName
        }]
      }, {
        path: 'myOrder',
        name: 'myOrder',
        component: MyOrder
      }, {
        path: 'coupon',
        name: 'coupon',
        component: Coupon
      }, {
        path: 'myAddress',
        name: 'myAddress',
        component: MyAddress,
        children: [{
          path: 'addAddress',
          name: 'addAddress',
          component: AddAddress
        }, {
          path: 'editAddress',
          name: 'editAddress',
          component: EditAddress
        }]
      }]
    }, {
      path: '/GoodsDetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    }]
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  // 解决路由跳转页面没有置顶
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})
// 添加导航守卫
const list = ['userCenter', 'myOrder', 'coupon', 'myAddress']
router.beforeEach((to, from, next) => {
  if (!store.getters.token && list.includes(to.name)) { // 进入 list 中的页面时，需要登录
    // next({
    //   name: 'login',
    //   query: { replace: to.fullPath },
    // }) // 报错： Redirected when going from "xxx" to "xxx" via a navigation guard."
    router.push({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
