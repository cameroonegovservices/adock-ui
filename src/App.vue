<template lang="pug">
  v-app
    message
    v-navigation-drawer(
      app
      clipped
      v-model="isDrawerVisible"
      absolute
      temporary
      right
    )
      v-list(dense)
        v-list-tile(:to="{name: 'about'}")
          v-list-tile-content
            v-list-tile-title En savoir plus
        v-list-tile(:to="{name: 'cgu'}")
          v-list-tile-content
            v-list-tile-title CGU
        v-list-tile(href='https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel')
          v-list-tile-content
            v-list-tile-title La Fabrique Numérique
    v-toolbar.white(app light)
      v-tooltip(bottom)
        span(slot="activator")
          img(src='./assets/marianne.svg' height='50px')
        div
          span A Dock v{{ meta.version }}
          br
          span {{ meta.carrier.localeCount }} transporteurs au {{ meta.carrier.localeDate }}
      router-link.adock-logo-link(:to="{name: 'search'}")
        h3.orange--text.text--darken-4.pl-2(v-if="isPreproduction") PRÉ-PRODUCTION
        img.adock-app-name(
          v-else
          src='./assets/adock.beta.gouv.fr-50.png'
          height='25px'
        )
      v-spacer
      v-toolbar-side-icon(
        v-if="$vuetify.breakpoint.xsOnly"
        @click="isDrawerVisible = !isDrawerVisible"
      )
      v-toolbar-items(v-else)
        v-btn(v-if="user && user.is_staff" flat :to="{name: 'self_test'}") Self Test
        v-btn(flat :to="{name: 'stats'}") Statistiques
        template(v-if="user")
          v-btn(
            flat
            :to="{name: 'account_profile'}"
          ) {{ displayUser }}
          v-btn(icon @click="userLogOut")
            v-icon exit_to_app
        v-btn(v-else flat :to="{name: 'account_login'}") Se connecter
    v-content
      v-alert.adock-alert-ie11(v-if="isIE11" :value="true" type="warning")
        | Nous vous recommandons d'utiliser un navigateur récent tel que&nbsp;
        a(href="https://www.mozilla.org/fr/firefox/") Firefox
        |  ou Chrome pour une expérience optimale.
      keep-alive
        router-view
    v-footer.pa-3.adock-footer
      v-spacer
      router-link.adock-footer-link(:to="{name: 'about'}") En savoir plus
      router-link.adock-footer-link(:to="{name: 'cgu'}") CGU
      v-spacer
      a.adock-french-mobility(href='https://www.ecologique-solidaire.gouv.fr/french-mobility')
        img(srcset='./assets/logo-french-mobility-120.png 1x, ./assets/logo-french-mobility-240.png 2x')
</template>

<style lang="stylus">
.adock-app-name
  padding-left: 8px

.adock-alert-ie11
  margin: 0

.adock-align-right
  text-align: right

.adock-toolbar-items
  padding-left: 1em
  align-items: center
  align-self: center

.adock-footer
  min-height: 64px

.adock-footer-link
  color: #999
  text-decoration: none
  padding: 0 24px

.adock-french-mobility
  padding-top: 7px

.adock-help h4, .adock-help h5, .adock-help h6
  padding: 0.5em 0

.adock-logo-link
  text-decoration: none

.adock-link
  text-decoration: underline

.adock-no-link
  color: inherit
  text-decoration: none

.adock-search-background
  background: no-repeat top/100% url('assets/search-background.jpg')
  background-color: white
</style>

<script>
import { mapState } from "vuex";

import { displayUserMixin } from "@/mixins";
import Message from "@/components/Message.vue";

export default {
  name: "app",

  mixins: [displayUserMixin],

  data() {
    return {
      isDrawerVisible: false,
      isIE11: false,
      isPreproduction:
        (process.env.VUE_APP_IS_PREPRODUCTION || "false") === "true"
    };
  },

  components: {
    message: Message
  },

  created() {
    this.$store.dispatch("loadMeta").then(() => {
      if (this.meta.version.length === 0) {
        // meta data is empty
        this.$router.push({ name: "error" });
      }
    });
    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    this.$store.dispatch("userLogInFromStorage");
  },

  computed: {
    ...mapState(["meta"])
  },

  methods: {
    userLogOut() {
      this.$store.dispatch("userLogOut");
      this.$router.push({ path: "/" });
    }
  }
};
</script>
