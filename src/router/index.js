import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

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
    },
    {
      path: '/registries',
      name: 'registries',
      component: () => import("@/views/Registries"),
      children: [
        {
          path: 'create',
          name: 'createRegistry',
          component: () => import("@/views/Registries"),
          beforeEnter: (to, from, next) => {
            store.commit('SET_CREATE_REGISTRY_VISIBILITY', true);
            next();
          }
        }
      ]
    }
  ]
})
