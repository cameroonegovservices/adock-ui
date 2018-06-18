<script>
import { mapState } from 'vuex'

import Message from '@/components/Message.vue'

export default {
  name: 'App',

  components: {
    Message
  },

  async created () {
    this.$store.dispatch('loadMeta').then(() => {
      if (this.meta.version.length === 0) {
        // meta data is empty
        this.$router.push({name: 'error'})
      }
    })
  },

  computed: {
    ...mapState([
      'meta'
    ])
  }
}
</script>

<template lang="pug">
  v-app
    Message
    v-toolbar.white(app light)
      v-tooltip(bottom)
        span(slot="activator")
          img(src='./assets/marianne.svg' height='50px')
        div
          span A Dock v{{ meta.version }}
          br
          span {{ meta.transporteur.localeCount }} transporteurs au {{ meta.transporteur.localeDate }}
      router-link(:to="{name: 'search'}")
        img.adock-app-name(src='./assets/adock.beta.gouv.fr-50.png' height='25px')
      v-spacer
      v-toolbar-items
        v-btn(flat :to="{name: 'about'}") En savoir plus
        v-btn(flat :to="{name: 'cgu'}") CGU
      a(href='https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel')
        img(src='./assets/logo-fabnum.svg' height='50px')
    v-content
      router-view
</template>

<style lang="stylus">
.adock-app-name
  padding-left: 8px
</style>
