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
      h3.orange--text.text--darken-4(v-if="isPreproduction") PRÉ-PRODUCTION
      router-link(v-else :to="{name: 'search'}")
        img.adock-app-name(
          src='./assets/adock.beta.gouv.fr-50.png'
          height='25px'
        )
      v-spacer
      v-toolbar-side-icon(
        v-if="$vuetify.breakpoint.xsOnly"
        @click="isDrawerVisible = !isDrawerVisible"
      )
      div(v-else)
        div(v-if="user")
          | {{ user.email }}
          v-btn(icon @click="userLogOut")
            v-icon exit_to_app
        v-btn(v-else flat :to="{name: 'login'}") Se connecter
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
      a(href='https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel')
        img(src='./assets/logo-fabnum.svg' height='50px')
</template>

<style lang="stylus">
.adock-app-name
  padding-left: 8px

.adock-alert-ie11
  margin: 0

.adock-footer
  min-height: 64px

.adock-footer-link
  color: #999
  text-decoration: none
  padding: 0 24px
</style>

<script>
import { mapState } from "vuex";

import Message from "@/components/Message.vue";

export default {
  name: "app",

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

  async created() {
    this.$store.dispatch("loadMeta").then(() => {
      if (this.meta.version.length === 0) {
        // meta data is empty
        this.$router.push({ name: "error" });
      }
    });
    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  },

  computed: {
    displayUser() {
      return this.user.first_name
        ? `${this.user.first_name} ${this.user.last_name}`
        : this.user.email;
    },
    ...mapState(["meta", "user"])
  },

  methods: {
    userLogOut() {
      this.$store.dispatch("userLogOut");
    }
  }
};
</script>
