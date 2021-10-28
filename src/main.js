import Vue from 'vue'
import App from './App.vue'
import store from './store'

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'

// 全局样式表
import './assets/css/base.css'
import './assets/css/font/iconfont.css'

import { request } from './network/request'

Vue.config.productionTip = false

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

Vue.prototype.$request = request

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
