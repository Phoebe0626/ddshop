import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter)

// 路由懒加载
const Home = () => import('../views/Home')
const Category = () => import('../views/Category')
const Eat = () => import('../views/Eat')
const Cart = () => import('../views/Cart')
const My = () => import('../views/My')

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
      component: My
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
