// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import login from './components/Login'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import IndexCommon from './components/IndexCommon'
import RequestApi from './api/https.js'
import Comjs from './assets/static/common'
import './assets/static/common.css'
import VueCookies from 'vue-cookies'
// 全局注册 markdown 插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 使用
Vue.use(mavonEditor)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.prototype.$requestApi=RequestApi
Vue.prototype.$comjs=Comjs



/**
 * 这种是全局注册
 */
Vue.component('IndexCommon',IndexCommon)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data : {
   aaa:"hahah"
  },
  router,
  components: {
     App,
   },
 
  template: "<App/>",
  methods: {
  
  },
  
})
