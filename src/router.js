import Vue from 'vue'
import Router from 'vue-router'

import { getTracker } from './tracker'
import Search from '@/views/Search.vue'
import Detail from '@/views/Detail.vue'
import Edit from '@/views/Edit.vue'
import api from './api'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search
  },
  {
    path: '/transporteur/:transporteurSiret',
    name: 'transporteur_detail',
    component: Detail,
    props: true
  },
  {
    path: '/transporteur/:transporteurSiret/edit',
    name: 'transporteur_edit',
    component: Edit,
    async beforeEnter (routeTo, routeFrom, next) {
      if (!routeTo.params.transporteur) {
        const response = await api.fetchTransporteur(routeTo.params.transporteurSiret)
        if (response.errors === null) {
          routeTo.params.transporteur = response.transporteur
        }
      }
      next()
    },
    props: true
  }
]

const router = new Router({
  mode: 'history',
  routes
})

// Enable Matomo tracker only for production
if (process.env.NODE_ENV === 'production') {
  router.beforeEach((to, from, next) => {
    const tracker = getTracker()
    if (tracker) {
      tracker.trackPageView(to.path)
    }
    next()
  })
}

export default router
