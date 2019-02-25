/* IE11 and old Firefox (v45) */
import "@babel/polyfill";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import Vue from "vue";
import Vuex from "vuex";
import "./useVuetify";
import * as Sentry from "@sentry/browser";
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
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_URL,
    relase: version,
    integrations: [
      new Sentry.Integrations.Vue({
        Vue,
        attachProps: true
      })
    ]
  });

  // Piwik/Matomo tracker
  loadTracker();
}

Vue.use(Vuex);
const store = new Vuex.Store(storeOptions);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
