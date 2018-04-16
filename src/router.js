import Vue from 'vue'
import Router from 'vue-router'
import MatomoTracker from 'matomo-tracker'

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
  const tracker = new MatomoTracker(50, '//stats.data.gouv.fr/piwik.php')

  router.beforeEach((to, from, next) => {
    tracker.track({
      url: window.origin + '/#' + to.path,
      title: to.name
    })
    next()
  })
}

export default router
