// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/common.css'
// 引入axios
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
// 追加原型
Vue.prototype.$http = axios
// 使用elementui
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
