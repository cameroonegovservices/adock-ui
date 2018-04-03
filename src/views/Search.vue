<template lang="pug">
  v-container(fluid fill-height)
    v-layout(justify-center)
      v-flex(xs12 md9 lg8 xl6)
        div.display-1.mt-4 Cherchez et contactez n'importe quel transporteur français
        v-alert(type="error" :value="error !== ''") {{ error }}
        v-text-field(
          v-model.trim="searchQuery"
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
        p(v-if="searchResponseIsEmpty") La recherche avec {{ searchParamsForDisplay }} n'a retourné aucun résultat.
        v-card.mt-1(v-if="transporteurs.length > 0")
          transporteur-results(
            :searchParamsForDisplay="searchParamsForDisplay"
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
      isSearchDone: false,
      searchQuery: '',
      searchLicenseTypes: [],
      searchParamsForDisplay: '',
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
    searchResponseIsEmpty () {
      return (
        !this.isSearching &&
        this.isSearchDone &&
        this.transporteurs.length === 0)
    }
  },

  methods: {
    async search () {
      let response

      // Remove error message as soon as the user clicks
      this.error = ''
      this.isSearching = true
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
        this.searchParamsForDisplay = this.getSearchParamsForDisplay({
          q: this.searchQuery,
          licenseTypes: this.searchLicenseTypes
        })
        this.isSearchDone = true
      } catch (error) {
        this.transporteurs = []
        this.limit = 0
        this.isSearchDone = false
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message
        } else {
          // Default
          this.error = `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
        }
      }
      this.isSearching = false
    },

    getSearchParamsForDisplay (searchParams) {
      let messages = []

      if (searchParams === null) {
        return ''
      }

      if (searchParams.q !== '') {
        messages.push(`« ${searchParams.q} »`)
      }

      let licenseTypes = searchParams.licenseTypes.map(item => item.text)
      if (licenseTypes.length > 0) {
        messages.push(`poids « ${licenseTypes.join(', ')} »`)
      }
      return messages.join(', ')
    }
  }
}
</script>
