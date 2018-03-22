/* IE11 and old Firerox (v45) */
import 'babel-polyfill'
import axios from 'axios'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import './stylus/main.styl'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000
})
Vue.use(Vuetify)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
