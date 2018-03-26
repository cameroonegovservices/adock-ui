<template lang="pug">
  v-container(fluid, fill-height)
    v-layout(justify-center)
      v-flex(xs12 md9 lg8 xl6)
        div.display-1.mt-4 Cherchez et contactez n'importe quel transporteur français
        v-alert(type="error" :value="error !== ''") {{ error }}
        v-text-field(
          v-model="searchQuery",
          label="Numéro de SIREN, SIRET ou nom de l'entreprise",
          hint="Vous pouvez utiliser les premiers chiffres du SIRET ou le nom partiel de l'entreprise.",
          @keyup.enter="search"
        )
        v-btn(large, color="primary", @click.native="search") Chercher
        p(v-if="previousSearchQuery !== null && isSearching === false && transporteurs.length === 0 && error === ''") La recherche sur «&nbsp;{{ previousSearchQuery }}&nbsp;» n'a retourné aucun résultat.
        v-card.mt-1(v-if="transporteurs.length > 0")
          transporteur-results(:searchQuery="previousSearchQuery", :transporteurs="transporteurs")
</template>

<script>
import api from '@/api.js'
import TransporteurResults from '@/components/TransporteurResults.vue'

export default {
  name: 'Search',

  data () {
    return {
      searchQuery: '',
      previousSearchQuery: null,
      transporteurs: [],
      error: ''
    }
  },

  components: {
    'transporteur-results': TransporteurResults
  },

  methods: {
    search () {
      this.searchQuery = this.searchQuery.trim()
      if (this.searchQuery.length === 0) {
        return
      }

      this.error = ''
      this.isSearching = true
      this.previousSearchQuery = this.searchQuery
      api.get('/transporteurs/recherche/', {
        params: {
          q: this.searchQuery
        }
      }).then(response => {
        // Disable reactivity to speed up rendering
        this.transporteurs = Object.freeze(response.data.results)
        this.isSearching = false
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message
        } else {
          // Default
          this.error = `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
        }
        this.isSearching = false
      })
    }
  }
}
</script>
