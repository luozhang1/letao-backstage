// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import {getlogin} from '@/api/index.js'

// 引入element-ui
import ElementUI from 'element-ui'

Vue.config.productionTip = false
// 使用ElementUI框架
Vue.use(ElementUI)
/* eslint-disable no-new */
// 添加路由全局守卫
router.beforeEach((to, from, next) => {
  getlogin().then(res => {
    if (res.status === 200) {
      if (res.data.error === 400) {
        next('/login')
      }
    }
  })
  next()
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
