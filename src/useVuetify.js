import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import fr from "vuetify/lib/locale/fr";

Vue.use(Vuetify, {
  customProperties: false,
  lang: {
    locales: { fr },
    current: "fr"
  }
});
