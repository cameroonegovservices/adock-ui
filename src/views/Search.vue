<template lang="pug">
  v-container(fill-height)
    v-layout
      v-flex(xs12)
        div.display-1.mt-5 Cherchez et contactez n'importe quel transporteur français
        v-text-field(v-model="searchQuery", label="Numéro de SIREN, SIRET ou nom de l'entreprise",
          hint="Vous pouvez utiliser un SIRET (9 chiffres), un SIRET (15 chiffres) ou le nom partiel de l'entreprise.")
        v-btn(large, color="primary", @click.native="search") Chercher
        span {{ error }}
        div(v-if="previousSearchQuery !== null") La recherche «&nbsp;{{ previousSearchQuery }}&nbsp;» a retourné {{ transporteurs.length }} résultats.

</template>

<script>
import axios from '@/resource'

export default {
  name: 'search',

  data () {
    return {
      searchQuery: '',
      previousSearchQuery: null,
      transporteurs: [],
      error: ''
    }
  },

  methods: {
    search () {
      this.searchQuery = this.searchQuery.trim()
      if (this.searchQuery.length === 0) {
        return
      }

      this.error = ''
      this.isSearching = true
      axios.get('/transporteurs/recherche/', {
        params: {
          q: this.searchQuery
        }
      }).then(response => {
        this.transporteurs = response.data.results
        this.previousSearchQuery = this.searchQuery
        this.isSearching = false
      }).catch((error) => {
        this.previousSearchQuery = ''
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message
        }
        this.isSearching = false
      })
    }
  }
}
</script>
