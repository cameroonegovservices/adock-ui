import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import TransporteurDetail from './views/TransporteurDetail.vue'

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
      component: TransporteurDetail,
      props: true
    }
  ]
})
