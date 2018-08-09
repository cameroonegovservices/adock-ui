import Vue from 'vue'
import VueRouter from 'vue-router'

import { getTracker } from './tracker'

import About from '@/views/About.vue'
import CGU from '@/views/CGU.vue'
import Detail from '@/views/Detail.vue'
import ConfirmEmail from '@/views/ConfirmEmail.vue'
import Edit from '@/views/Edit.vue'
import Search from '@/views/Search.vue'
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
    path: '/transporteur/:transporteurSiret',
    name: 'transporteur_detail',
    component: Detail,
    props: true
  },
  {
    path: '/transporteur/:transporteurSiret/edit',
    name: 'transporteur_edit',
    component: Edit,
    props: true
  },
  {
    path: '/transporteur/:transporteurSiret/confirm/:token',
    name: 'transporteur_confirm_email',
    component: ConfirmEmail,
    props: true
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
  // Temporary (2018-08-08) new URL to fix an issue in a mailing with wrong link
  {
    path: '/:transporteurSiret',
    redirect: {
      name: 'transporteur_detail'
    }
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
