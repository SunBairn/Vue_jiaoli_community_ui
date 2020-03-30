import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import IndexCommon from '@/components/IndexCommon'
import Login from '@/components/Login'
import App from '@/App'
import Register from '@/components/Register'
import QuestionDetail from '@/components/detail_view/QuestionDetail'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  // 路由高亮显示
  linkActiveClass : "active",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Nav,
      
    },
    {
      path: '/nav/:name',
      name: 'Nav',
      component: Nav,
      // 放展示具体数据的主键
      children:[
        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail
    }
  ]
})
