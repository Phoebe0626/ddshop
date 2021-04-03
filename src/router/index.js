import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'

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
// 登录页
const Login = () => import('../views/Login')

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [{
      path: '/dashboard',
      redirect: '/dashboard/home'
    }, {
      path: 'home',
      name: 'home',
      component: Home
    }, {
      path: 'category',
      name: 'category',
      component: Category
    }, {
      path: 'eat',
      name: 'eat',
      component: Eat
    }, {
      path: 'cart',
      name: 'cart',
      component: Cart
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
      }]
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
