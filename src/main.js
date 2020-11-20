// import "@babel/polyfill"

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './registerServiceWorker'

// 相关工具函数
import https from './utils/https'
import * as utils from './utils/utils'
import * as request from './utils/request'
import * as validate from './utils/validate'

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/theme/index.css' // 自定义主题

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import htmlToPdf from '@/views/Common/PDF/htmlToPdf.js'
// 使用Vue.use()方法就会调用工具方法中的install方法
Vue.use(htmlToPdf)

// 挂载全局
Vue.prototype.$https = https
Vue.prototype.$utils = utils
Vue.prototype.$request = request
Vue.prototype.$validate = validate

// 开发环境下
if (process.env.NODE_ENV === 'development') {
  // 开启mockjs
  require('./mock/index')
}

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

// 判断登录状态
router.beforeEach(async(to, from, next) => {
  const token = localStorage.getItem('token') || null
  const username = localStorage.getItem('username') || null

  if (token == null && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    store.commit('setUser', { username: username })
    // await store.dispatch('permission/generateRoutes')
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
