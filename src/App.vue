<template lang="pug">
  v-app
    v-toolbar.white(app light flat)
      router-link(:to="{name: 'search'}")
        img(src='./assets/marianne.svg', width='80px')
      img.app-name(src='./assets/adock.beta.gouv.fr-25.png', height='25px')
    v-content
      router-view
    v-footer.pa-3(app absolute)
      span(v-if="version") v{{ version }}
      v-spacer
      span(v-if="transporteur.count")
        .
          {{ transporteur.count }} transporteurs inscrits au {{ transporteurLocaleDate }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  async created () {
    this.$store.dispatch('loadMeta')
  },

  computed: {
    transporteurLocaleDate () {
      if (this.transporteur.date) {
        const date = new Date(this.transporteur.date)
        return date.toLocaleDateString()
      } else {
        return ''
      }
    },
    ...mapState([
      'version',
      'transporteur'
    ])
  }
}
</script>

<style scoped>
.app-name {
  padding-left: 8px;
}
</style>
