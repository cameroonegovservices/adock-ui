<script>
import deepClone from 'lodash.clonedeep'
import { mapState } from 'vuex'
import saveState from 'vue-save-state'

import api from '@/api.js'
import GlobalError from '@/components/GlobalError.vue'
import TransporteurList from '@/components/TransporteurList.vue'

const defaultSearchForm = {
  q: '',
  licenseTypes: [],
  departementFrom: '',
  departementTo: '',
  specialities: []
}

export default {
  name: 'Search',

  mixins: [
    saveState
  ],

  props: {
    keepPreviousSearch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isSearching: false,
      searchForm: deepClone(defaultSearchForm),
      searchParams: null,
      transporteurs: null,
      limit: 0,
      errors: null
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
    GlobalError,
    TransporteurList
  },

  computed: {
    searchResponseIsEmpty () {
      return (
        !this.isSearching &&
        this.transporteurs != null &&
        this.transporteurs.length === 0)
    },
    ...mapState([
      'meta',
      'options'
    ])
  },

  methods: {
    getSaveStateConfig () {
      return {
        onLoad: (key, value) => {
          if (this.keepPreviousSearch) {
            return value
          } else {
            // Default data values
            return this[key]
          }
        },
        cacheKey: 'transporteurSearch',
        saveProperties: [
          'searchForm',
          'searchParams',
          'transporteurs',
          'limit'
        ]
      }
    },

    async search () {
      // Remove error message as soon as the user clicks
      this.errors = null
      this.isSearching = true

      const data = await api.searchTransporteurs({
        // The parameters of the query are in French
        params: {
          'q': this.searchForm.q,
          'licence-types': this.searchForm.licenseTypes.map(item => item.value),
          'departement-depart': this.searchForm.departementFrom,
          'departement-arrivee': this.searchForm.departementTo,
          'specialities': this.searchForm.specialities.map(item => item.value)
        }
      })

      if (data.errors == null) {
        // Disable reactivity to speed up rendering
        this.transporteurs = Object.freeze(data.transporteurs)
        this.limit = data.limit
        // Build an object with search parameters to display them to the user with the results
        this.searchParams = JSON.parse(JSON.stringify(this.searchForm))
      } else {
        this.errors = data.errors
        this.transporteurs = null
        this.limit = 0
      }

      this.isSearching = false
    },

    clear () {
      this.searchForm = deepClone(defaultSearchForm)
    }
  }
}
</script>

<template lang="pug">
  v-container.adock-search-background(fluid fill-height)
    v-layout(row justify-center)
      v-flex(xs12 sm11 md9 lg8 xl6)
        v-card.elevation-8
          v-card-text
            div.display-1.mt-4.hidden-xs-only Cherchez et contactez simplement l'un des {{ meta.transporteur.localeCount || '50 000' }} transporteurs français de marchandises
            div.display-1.mt-4.hidden-sm-and-up Cherchez parmi les transporteurs français
            GlobalError(:errors="errors")
            v-text-field(
              v-model.trim="searchForm.q"
              label="Nom, code postal ou SIRET de l'entreprise"
              hint="Vous pouvez séparer les différents critères par une virgule (ex. « TRANS, OUEST, 35 »)."
              @keyup.enter="search"
              data-cy="searchFormQ"
            )
            v-container(fluid ma-0 pa-0 align-baseline grid-list-md)
              v-layout(row wrap align-end)
                v-flex(xs12 sm8 md4)
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
                v-flex(xs12 sm6 md4)
                  v-text-field(
                    v-model.number='searchForm.departementFrom'
                    label="Département d'enlèvement"
                    mask="###"
                    @keyup.enter="search"
                    data-cy="searchFormDepartementFrom"
                  )
                v-flex(xs12 sm6 md4)
                  v-text-field(
                    v-model.number='searchForm.departementTo'
                    label="Département de livraison"
                    mask="###"
                    @keyup.enter="search"
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
            v-btn(@click.native="clear") Effacer
        TransporteurList(
          :searchParams="searchParams"
          :searchResponseIsEmpty="searchResponseIsEmpty"
          :transporteurs="transporteurs"
          :limit="limit"
        )
        v-card.elevation-0.adock-cta
          v-container.pt-4
            v-layout.adock-cta(row wrap justify-space-around)
              v-flex(xs3)
                h2.text-xs-center
                  v-icon(x-large) search
                h3.text-xs-center 1. Recherchez votre entreprise
                p.text-xs-center Grâce à son SIRET ou son nom
              v-flex(xs3)
                h2.text-xs-center
                  v-icon(x-large) mode_edit
                h3.text-xs-center 2. Complétez votre fiche transporteur
                p.text-xs-center
                  | Avec le téléphone ou le mail de votre commercial
                  | et votre spécialité (par ex. transport frigorifique)
              v-flex(xs3)
                h2.text-xs-center
                  v-icon(x-large) call
                h3.text-xs-center 3. Apparaissez en tête des recherches
                p.text-xs-center Grâce à votre profil complet !
</template>

<style lang="stylus">
.adock-search-background
  background: no-repeat top/100% url('../assets/search-background.jpg')
  background-color: white

.card.adock-cta
  background-color: rgba(255, 255, 255, .7)

.layout.adock-cta
  h3, p, .icon
    color: #373C42
</style>
