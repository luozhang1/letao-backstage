import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/user/User.vue'
import categoryFirst from '@/views/category/categoryFirst'
import categorySecond from '@/views/category/categorySecond'
import productList from '@/views/product/productList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: { 'name': 'Login' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: { 'name': 'Welcome' },
      // 添加嵌套路由
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        }, {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/categoryFirst',
          name: 'categoryFirst',
          component: categoryFirst
        },
        {
          path: '/categorySecond',
          name: 'categorySecond',
          component: categorySecond
        },
        {
          path: '/productList',
          name: 'productList',
          component: productList
        }
      ]
    }

  ]
})
