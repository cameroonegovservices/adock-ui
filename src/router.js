import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/transporteur/:transporteurSiret',
      name: 'transporteur',
      component: Detail,
      props: true
    }
  ]
})
