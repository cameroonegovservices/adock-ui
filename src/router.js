import Vue from 'vue'
import VueRouter from 'vue-router'

import { getTracker } from './tracker'
import Search from '@/views/Search.vue'
import Detail from '@/views/Detail.vue'
import Edit from '@/views/Edit.vue'
import CGU from '@/views/CGU.vue'
import ViewError from '@/views/ViewError.vue'
import api from './api'

Vue.use(VueRouter)

async function loadTransporteur (routeTo, next) {
  const response = await api.fetchTransporteur(routeTo.params.transporteurSiret)
  if (response.error === null) {
    routeTo.params.transporteur = response.transporteur
    next()
  } else {
    // Error
    let fallbackUrl
    if (response.error.status === 404) {
      // Unavailable
      fallbackUrl = '/'
    } else {
      // Try again
      fallbackUrl = routeTo.path
    }
    next({
      name: 'error',
      params: {
        message: response.error.message,
        status: response.error.status,
        fallbackUrl
      }
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search,
    props: true
  },
  {
    path: '/transporteur/:transporteurSiret',
    name: 'transporteur_detail',
    component: Detail,
    props: true,
    async beforeEnter (routeTo, routeFrom, next) {
      // Load the JSON of transporteur before entering
      await loadTransporteur(routeTo, next)
    }
  },
  {
    path: '/transporteur/:transporteurSiret/edit',
    name: 'transporteur_edit',
    component: Edit,
    props: true,
    async beforeEnter (routeTo, routeFrom, next) {
      if (routeTo.params.transporteur) {
        next()
      } else {
        await loadTransporteur(routeTo, next)
      }
    }
  },
  {
    path: '/cgu',
    name: 'cgu',
    component: CGU
  },
  {
    path: '/error',
    name: 'error',
    component: ViewError,
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
