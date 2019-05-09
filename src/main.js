/* IE11 and old Firefox (v45) */
import "@babel/polyfill";
import "leaflet/dist/leaflet.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import L from "leaflet";
import Vue from "vue";
import Vuex from "vuex";
import "./useVuetify";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import { version } from "../package.json";

import { loadTracker } from "./tracker";
import App from "./App.vue";
import router from "./router";
import { storeOptions } from "./store/options";

Vue.config.productionTip = false;

// Workaround to load marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

if (process.env.NODE_ENV === "production") {
  // Raven is the client of Sentry
  // Take care to set VUE_APP_RAVEN_URL in .env.production.local
  Raven.config(process.env.VUE_APP_RAVEN_URL, {
    release: version
  })
    .addPlugin(RavenVue, Vue)
    .install();

  // Piwik/Matomo tracker
  if (!process.env.VUE_APP_IS_PREPRODUCTION) {
    loadTracker();
  }
}

Vue.use(Vuex);
const store = new Vuex.Store(storeOptions);

new Vue({
  iconfont: "md",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
