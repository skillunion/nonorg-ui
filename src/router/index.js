import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/works'
    },
    {
      path: '/works',
      name: 'works',
      component: () => import("@/views/Works")
    },
    {
      path: '/apollo',
      name: 'apollo',
      component: () => import("@/views/Apollo")
    },
    {
      path: '/topics',
      name: 'topics',
      component: () => import("@/views/Topics")
    }
  ]
})
