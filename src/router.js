import Vue from 'vue'
import Router from 'vue-router'

import { getTracker } from './tracker'
import Search from './views/Search.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

const routes = [
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
