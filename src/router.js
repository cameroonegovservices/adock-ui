import Vue from 'vue'
import VueRouter from 'vue-router'

import { getTracker } from './tracker'

import About from '@/views/About.vue'
import CGU from '@/views/CGU.vue'
import ConfirmEmail from '@/views/ConfirmEmail.vue'
import Detail from '@/views/Detail.vue'
import Edit from '@/views/Edit.vue'
import Search from '@/views/Search.vue'
import Stats from '@/views/Stats.vue'
import ViewError from '@/views/ViewError.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search,
    props: true
  },
  {
    path: '/transporteur/:carrierSiret',
    name: 'carrier_detail',
    component: Detail,
    props: true
  },
  {
    path: '/transporteur/:carrierSiret/edit',
    name: 'carrier_edit',
    component: Edit,
    props: true
  },
  {
    path: '/transporteur/:carrierSiret/confirm/:token',
    name: 'carrier_confirm_email',
    component: ConfirmEmail,
    props: true
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats
  },
  {
    path: '/about',
    name: 'about',
    component: About
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
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
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
