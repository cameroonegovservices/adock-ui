import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Subscribe from './views/Subscribe.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: Subscribe
    }
  ]
})
