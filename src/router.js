import Vue from 'vue'
import VueRouter from 'vue-router'

import { getTracker } from './tracker'
import Search from '@/views/Search.vue'
import Detail from '@/views/Detail.vue'
import Edit from '@/views/Edit.vue'
import CGU from '@/views/CGU.vue'
import ResourceError from '@/views/ResourceError.vue'
import api from './api'

Vue.use(VueRouter)

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
      if (routeTo.params.transporteur) {
        next()
      } else {
        // Load the JSON of transporteur before entering
        const response = await api.fetchTransporteur(routeTo.params.transporteurSiret)
        if (response.errors === null) {
          routeTo.params.transporteur = response.transporteur
          next()
        } else {
          // Error
          next({name: 'error', params: { errorUrl: routeTo.path }})
        }
      }
    },
    props: true
  },
  {
    path: '/cgu',
    name: 'cgu',
    component: CGU
  },
  {
    path: '/error',
    name: 'error',
    component: ResourceError,
    props: true
  }
]

const router = new VueRouter({
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
