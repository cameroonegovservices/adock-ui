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
      v-toolbar-items(v-else)
        v-btn(flat :to="{name: 'about'}") En savoir plus
        v-btn(flat :to="{name: 'cgu'}") CGU
        a(href='https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel')
          img(src='./assets/logo-fabnum.svg' height='50px')
    v-content
      v-alert.adock-alert-ie11(v-if="isIE11" :value="true" type="warning")
        | Nous vous recommandons d'utiliser un navigateur récent tel que&nbsp;
        a(href="https://www.mozilla.org/fr/firefox/") Firefox
        |  ou Chrome pour une expérience optimale.
      keep-alive
        router-view
</template>

<style lang="stylus">
.adock-app-name
  padding-left: 8px

.adock-alert-ie11
  margin: 0
</style>

<script>
import { mapState } from 'vuex'

import Message from '@/components/Message.vue'

export default {
  name: 'app',

  data () {
    return {
      isDrawerVisible: false,
      isIE11: false,
      isPreproduction: (process.env.VUE_APP_IS_PREPRODUCTION || 'false') === 'true'
    }
  },

  components: {
    'message': Message
  },

  async created () {
    this.$store.dispatch('loadMeta').then(() => {
      if (this.meta.version.length === 0) {
        // meta data is empty
        this.$router.push({ name: 'error' })
      }
    })
    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode
  },

  computed: {
    ...mapState([
      'meta'
    ])
  }
}
</script>
