import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import IndexCommon from '@/components/IndexCommon'
import Login from '@/components/Login'
import App from '@/App'
import Register from '@/components/Register'
import QuestionDetail from '@/components/detail_view/QuestionDetail'
import ArticleDetail from '@/components/detail_view/ArticleDetail'
import PublishQuestion from '@/components/publish_view/PublishQuestion'
import PublishInvitation from '@/components/publish_view/PublishInvitation'
import PublishArticle from '@/components/publish_view/PublishArticle'
import UserCenter from '@/components/UserCenter'
import Profile from '@/components/user_center/Profile'
import CollectionList from '@/components/user_center/CollectionList'
import ArticleList from '@/components/user_center/ArticleList'
import QuestionList from '@/components/user_center/QuestionList'
import InvitationList from '@/components/user_center/InvitationList'
import FanList from '@/components/user_center/FanList'
import FollowList from '@/components/user_center/FollowList'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  // 路由高亮显示
  linkActiveClass : "active",
  routes: [
    // 跳转主页路由
    {
      path: '/',
      name: 'Home',
      component: Nav,
      
    },
    // 动态切换导航内容
    {
      path: '/nav/:name',
      name: 'Nav',
      component: Nav,
      // 放展示具体数据的主键
      children:[
        
      ]
    },
    // 跳转登录页面
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 注册页面路由
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
     // 展示问题详情路由
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    // 展示文章详情路由
    {
      path: '/article/:id',
      name: 'ArticleDeatil',
      component: ArticleDetail
    },
    // 发布问题帖子文章路由
    {
      path: '/publish/question',
      name: 'PublishQuestion',
      component: PublishQuestion
    },
    {
      path: '/publish/invitation',
      name: 'PublishInvitation',
      component: PublishInvitation
    },

    // 发布文章
    {
      path: '/publish/article',
      name: 'PublishArticle',
      component: PublishArticle
    },
     // 用户中心
    {
      path: '/uc',
      name : "UserCenter",
      component: UserCenter,
      children : [
       {
         path: 'profile',
         component: Profile
       },
       {
        path: 'collection-list',
        component: CollectionList
      },
      {
        path: 'follow-list',
        component: FollowList
      },
      {
        path: 'fan-list',
        component: FanList
      },
      {
        path: 'invitation-list',
        component: InvitationList
      },
      {
        path: 'question-list',
        component: QuestionList
      },
      {
        path: 'article-list',
        component: ArticleList
      },
      ]
    }
  ]
})
