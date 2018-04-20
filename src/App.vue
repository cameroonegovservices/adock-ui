<template lang="pug">
  v-app
    v-toolbar.white(app light)
      v-tooltip(bottom)
        span(slot="activator")
          img(src='./assets/marianne.svg' width='80px')
        div
          span A Dock v{{ meta.version }}
          br
          span {{ meta.transporteur.localeCount }} transporteurs au {{ meta.transporteur.localeDate }}
      router-link(:to="{name: 'search'}")
        img.adock-app-name(src='./assets/adock.beta.gouv.fr-50.png' height='25px')
    v-content
      router-view
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  async created () {
    this.$store.dispatch('loadMeta')
  },

  computed: {
    ...mapState([
      'meta'
    ])
  }
}
</script>

<style lang="stylus">
.adock-app-name
  padding-left: 8px
</style>
