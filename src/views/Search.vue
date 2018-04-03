<template lang="pug">
  v-container(fluid fill-height)
    v-layout(justify-center)
      v-flex(xs12 md9 lg8 xl6)
        div.display-1.mt-4 Cherchez et contactez n'importe quel transporteur français
        v-alert(type="error" :value="error !== ''") {{ error }}
        v-text-field(
          v-model="searchQuery"
          label="Numéro de SIREN, SIRET ou nom de l'entreprise"
          hint="Vous pouvez utiliser les premiers chiffres du SIRET ou le nom partiel de l'entreprise."
          @keyup.enter="search"
        )
        v-flex(xs6 md5 lg4 xl3)
          v-select(
            v-model="searchLicenseTypes"
            label="Filtre sur le poids"
            hint="Le transporteur doit disposer d'au moins une licence pour le critère."
            chips
            tags
            :items="searchLicenseTypeChoices"
            return-object
          )
            template(
              slot="selection"
              slot-scope="data"
            )
              v-chip.chip--select--multi(
                @input="data.parent.selectItem(data.item)"
                :selected="data.selected"
                :disabled="data.disabled"
                :key="JSON.stringify(data.item)"
              )
                v-avatar.accent {{ data.item.avatar }}
                .
                  {{ data.item.text }}
        v-btn(large color="primary" @click.native="search") Chercher
        p(v-if="searchIsEmpty") La recherche sur «&nbsp;{{ searchParams }}&nbsp;» n'a retourné aucun résultat.
        v-card.mt-1(v-if="transporteurs.length > 0")
          transporteur-results(
            :searchParams="searchParams"
            :transporteurs="transporteurs"
            :limit="limit"
          )
</template>

<script>
import api from '@/api.js'
import TransporteurResults from '@/components/TransporteurResults.vue'

export default {
  name: 'Search',

  data () {
    return {
      isSearching: false,
      searchQuery: '',
      searchLicenseTypes: [],
      searchParams: null,
      transporteurs: [],
      limit: 0,
      error: ''
    }
  },

  created () {
    this.searchLicenseTypeChoices = [
      {
        text: 'Léger',
        value: 'lti',
        avatar: 'LTI'
      },
      {
        text: 'Lourd',
        value: 'lc',
        avatar: 'LC'
      }
    ]
  },

  components: {
    'transporteur-results': TransporteurResults
  },

  computed: {
    searchIsEmpty () {
      return (
        this.searchParams !== null &&
        this.isSearching === false &&
        this.transporteurs.length === 0 &&
        this.error === '')
    }
  },

  methods: {
    async search () {
      this.searchQuery = this.searchQuery.trim()

      this.error = ''
      this.isSearching = true
      this.searchParams = this.searchQuery
      let response

      try {
        // The parameters of the query are in French
        response = await api.get('/transporteurs/recherche/', {
          params: {
            q: this.searchQuery,
            licencetypes: this.searchLicenseTypes.map(item => item.value)
          }
        })
        // Disable reactivity to speed up rendering
        this.transporteurs = Object.freeze(response.data.results)
        this.limit = response.data.limit || 0
        this.isSearching = false
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message
        } else {
          // Default
          this.error = `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
        }
        this.isSearching = false
      }
    }
  }
}
</script>
