<template lang="pug">
  v-container(fluid, fill-height)
    v-layout(justify-center)
      v-flex(xs12 md9 lg8 xl6)
        div.display-1.mt-4 Cherchez et contactez n'importe quel transporteur français
        v-text-field(
          v-model="searchQuery",
          label="Numéro de SIREN, SIRET ou nom de l'entreprise",
          hint="Vous pouvez utiliser un SIRET (9 chiffres), un SIRET (15 chiffres) ou le nom partiel de l'entreprise.",
          @keyup.enter="search"
        )
        v-btn(large, color="primary", @click.native="search") Chercher
        p {{ error }}
        p(v-if="previousSearchQuery !== null && transporteurs.length === 0") La recherche sur «&nbsp;{{ previousSearchQuery }}&nbsp;» n'a retourné aucun résultat.

        v-card(v-if="transporteurs.length > 0")
          transporteur-list(:searchQuery="previousSearchQuery", :transporteurs="transporteurs")
</template>

<script>
import axios from '@/resource'
import TransporteurList from '@/components/TransporteurList.vue'

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
    'transporteur-list': TransporteurList
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
      axios.get('/transporteurs/recherche/', {
        params: {
          q: this.searchQuery
        }
      }).then(response => {
        this.transporteurs = response.data.results
        this.isSearching = false
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message
        }
        this.isSearching = false
      })
    }
  }
}
</script>
