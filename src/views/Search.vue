<template lang="pug">
  v-container(fluid fill-height)
    v-layout(row justify-center)
      v-flex(xs12 sm11 md9 lg8 xl6)
        div.display-1.mt-4 Cherchez et contactez n'importe quel transporteur français
        v-alert(type="error" :value="error !== ''") {{ error }}
        v-text-field(
          v-model.trim="searchQuery"
          label="Numéro de SIREN, SIRET ou nom de l'entreprise"
          hint="Vous pouvez utiliser les premiers chiffres du SIRET ou le nom partiel de l'entreprise."
          @keyup.enter="search"
        )
        v-container(fluid ma-0 pa-0 align-baseline grid-list-md)
          v-layout(row wrap align-end)
            v-flex(xs12 sm4 md4)
              v-select(
                :items="searchLicenseTypeChoices"
                v-model="searchLicenseTypes"
                label="Filtre sur le poids"
                hint="Le transporteur doit disposer d'au moins une licence pour le critère."
                chips
                multiple
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
                    close
                  )
                    v-avatar.accent {{ data.item.avatar }}
                    .
                      {{ data.item.text }}
            v-flex(xs6 sm4 md3)
              v-text-field(
                v-model.number='departementFrom'
                label="Département de départ"
                mask="###"
              )
            v-flex(xs6 sm4 md3)
              v-text-field(
                v-model.number='departementTo'
                label="Département d'arrivée"
                mask="###"
              )
        v-btn(large color="primary" @click.native="search") Chercher
        transporteur-results(
          :searchParams="searchParams"
          :searchResponseIsEmpty="searchResponseIsEmpty"
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
      searchParams: null,
      departementFrom: null,
      departementTo: null,
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
            'q': this.searchQuery,
            'licence-types': this.searchLicenseTypes.map(item => item.value),
            'departement-depart': this.departementFrom,
            'departement-arrivee': this.departementTo
          }
        })
        // Disable reactivity to speed up rendering
        this.transporteurs = Object.freeze(response.data.results)
        this.limit = response.data.limit || 0
        this.searchParams = {
          q: this.searchQuery,
          licenseTypes: this.searchLicenseTypes,
          departementFrom: this.departementFrom,
          departementTo: this.departementTo
        }
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
    }
  }
}
</script>
