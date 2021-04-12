import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant'
import ToTop from './components/ToTop'

import './css/index.css'

import 'amfe-flexible'

import './icons'

Vue.component('to-top', ToTop) // 全局注册 返回顶部按钮 组件

Vue.use(Lazyload, {
  lazyComponent: true,
  loading: require('./assets/images/home/loading.gif'), // 加载中图片，一定要有，不然会一直重复加载占位图
  error: require('./assets/images/home/fail.jpg') // 加载失败图片
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
