import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import Subscribe from './views/Subscribe.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: Subscribe
    }
  ]
})
