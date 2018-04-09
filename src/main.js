/* IE11 and old Firerox (v45) */
import 'babel-polyfill'

import Vue from 'vue'
import { Vuetify } from 'vuetify'
import vuetifyOptions from './vuetifyOptions'
import App from './App.vue'
import router from './router'
import store from './store'

import './stylus/main.styl'

Vue.config.productionTip = false
Vue.use(Vuetify, vuetifyOptions)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
