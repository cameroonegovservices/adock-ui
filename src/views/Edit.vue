<script>
import { mapState } from 'vuex'
import TransporteurCardHeader from '@/components/TransporteurCardHeader'

import api from '@/api.js'
import router from '@/router.js'

export default {
  name: 'Edit',

  props: {
    transporteurSiret: {
      type: String,
      required: true
    },
    transporteur: {
      type: Object,
      required: true
    }
  },

  components: {
    TransporteurCardHeader
  },

  data () {
    return {
      form: {
        email: '',
        telephone: '',
        working_area: '',
        working_area_departements: '',
        specialities: [],
        website: ''
      },
      errors: {}
    }
  },

  created () {
    this.loadForm(this.transporteur)
  },

  computed: {
    ...mapState([
      'options'
    ])
  },

  methods: {
    loadForm (transporteur) {
      // Populate the form fields with the transporteur data
      for (let field in this.form) {
        if (field === 'working_area_departements') {
          // Join county numbers with '0' padding for number < 100
          const value = transporteur[field]
          this.form[field] = value ? value.join(', ') : ''
        } else if (field === 'specialities') {
          // v-select expects [] instead of null
          this.form[field] = transporteur[field] || []
        } else {
          // Default for other fields
          this.form[field] = transporteur[field]
        }
      }
    },

    async update () {
      const data = await api.updateTransporteur(this.transporteurSiret, this.form)
      if (data.errors) {
        this.errors = data.errors
      } else {
        this.$store.commit('ADD_MESSAGE', {
          message: {
            color: null,
            text: `Transporteur « ${this.transporteur.raison_sociale} » enregistré.`
          }
        })
        router.push({name: 'transporteur_detail', transporteurSiret: this.transporteurSiret})
      }
    }
  }
}
</script>

<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm11 md9 lg8 xl6)
        router-link(:to="{name: 'search'}").d-inline-flex.align-center.adock-no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Recherche
        v-card
          TransporteurCardHeader(:transporteur="transporteur")
          v-container(grid-list-lg)
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-model="form.telephone"
                  input="telephone"
                  label="Téléphone"
                  :error-messages="errors.telephone"
                  data-cy="inputTelephone"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-model="form.email"
                  input="email"
                  label="Adresse électronique"
                  :error-messages="errors.email"
                  data-cy="inputEmail"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-select(
                  v-model="form.working_area"
                  :items="options.workingAreas"
                  label="Aire de travail"
                  data-cy="inputWorkingArea"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-if="form.working_area === 'DEPARTEMENT'"
                  v-model="form.working_area_departements"
                  label="Départements livrés"
                  hint="Numéros des départements séparés par des espaces ou virgules"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-select(
                  :items="options.specialities"
                  v-model="form.specialities"
                  label="Spécialités"
                  chips
                  multiple
                  deletable-chips
                  data-cy="inputSpecialities"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-model="form.website"
                  input="url"
                  label="Site Web"
                  :error-messages="errors.website"
                )
            v-layout
              v-flex.adock-align-right(xs12 md11)
                v-btn(:to="{name: 'transporteur_detail', params: { transporteurSiret: transporteur.siret }}") Annuler
                v-btn(color="primary" @click.native="update") Valider
</template>

<style lang="stylus">
.adock-no-link
  color: inherit
  text-decoration: none

.adock-align-right
  text-align: right

.flex.flex-bottom
  flex-basis: 0
</style>
