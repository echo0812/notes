import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        component: resolve => require(['../pages/index.vue'], resolve)
      }, {
        path: '/notes/edit',
        component: resolve => require(['../pages/notes/edit.vue'], resolve)
      },
      {
        path: '/notes/index/',
        component: resolve => require(['../pages/notes/index.vue'], resolve)
      },
      {
        path: '/notes/detail',
        component: resolve => require(['../pages/notes/detail.vue'], resolve)
      }
  ]
})
