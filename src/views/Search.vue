<template lang="pug">
  v-container(fluid fill-height)
    v-layout(row justify-center)
      v-flex(xs12 sm11 md9 lg8 xl6)
        v-card
          v-card-text
            div.display-1.mt-4 Cherchez et contactez n'importe quel transporteur français
            v-alert(type="error" :value="error !== ''") {{ error }}
            v-text-field(
              v-model.trim="searchForm.q"
              label="Numéro de SIREN, SIRET ou nom de l'entreprise"
              hint="Vous pouvez utiliser les premiers chiffres du SIRET ou le nom partiel de l'entreprise."
              @keyup.enter="search"
              data-cy="searchFormQ"
            )
            v-container(fluid ma-0 pa-0 align-baseline grid-list-md)
              v-layout(row wrap align-end)
                v-flex(xs12 sm4 md4)
                  v-select(
                    :items="searchLicenseTypeChoices"
                    v-model="searchForm.licenseTypes"
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
                    v-model.number='searchForm.departementFrom'
                    label="Département de départ"
                    mask="###"
                  )
                v-flex(xs6 sm4 md3)
                  v-text-field(
                    v-model.number='searchForm.departementTo'
                    label="Département d'arrivée"
                    mask="###"
                  )
            v-container(fluid ma-0 pa-0 align-baseline grid-list-md)
              v-layout(row)
                v-flex(xs12 sm8 md7)
                  v-select(
                    :items="options.specialities"
                    v-model="searchForm.specialities"
                    label="Filtre sur les spécialités"
                    chips
                    multiple
                    deletable-chips
                    return-object
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
import { mapState } from 'vuex'
import Raven from 'raven-js'

import api from '@/api.js'
import TransporteurResults from '@/components/TransporteurResults.vue'

export default {
  name: 'Search',

  data () {
    return {
      isSearching: false,
      isSearchDone: false,
      searchForm: {
        q: '',
        licenseTypes: [],
        departementFrom: null,
        departementTo: null,
        specialities: []
      },
      searchParams: null,
      transporteurs: [],
      limit: 0,
      error: ''
    }
  },

  created () {
    // FIXME To move to /meta...
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
    },
    ...mapState([
      'options'
    ])
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
            'q': this.searchForm.q,
            'licence-types': this.searchForm.licenseTypes.map(item => item.value),
            'departement-depart': this.searchForm.departementFrom,
            'departement-arrivee': this.searchForm.departementTo,
            'specialities': this.searchForm.specialities.map(item => item.value)
          }
        })
        // Disable reactivity to speed up rendering
        this.transporteurs = Object.freeze(response.data.results)
        this.limit = response.data.limit || 0
        // Build an object with search parameters to display them to the user with the results
        this.searchParams = JSON.parse(JSON.stringify(this.searchForm))
        this.isSearchDone = true
      } catch (error) {
        this.transporteurs = []
        this.limit = 0
        this.isSearchDone = false
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message
        } else {
          // Default
          Raven.captureException(error)
          this.error = `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
        }
      }
      this.isSearching = false
    }
  }
}
</script>
