<template lang="pug">
  v-app
    v-toolbar.white(app light flat)
      router-link(:to="{name: 'search'}")
        img(src='./assets/marianne.svg', width='80px')
      img.app-name(src='./assets/adock.beta.gouv.fr-50.png', height='25px')
    v-content
      router-view
    v-footer.white.pa-3(app absolute)
      span(v-if="meta.version") v{{ meta.version }}
      v-spacer
      span(v-if="meta.transporteur.count")
        .
          {{ meta.transporteur.count }} transporteurs au {{ meta.transporteur.localeDate }}
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

<style scoped>
.app-name {
  padding-left: 8px;
}
</style>
