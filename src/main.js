import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './stylus/main.styl'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
