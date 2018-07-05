<script>
import { mapState } from 'vuex'
import TransporteurCardHeader from '@/components/TransporteurCardHeader'

import api from '@/api.js'
import router from '@/router.js'

export default {
  name: 'Edit',

  props: {
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
        website: '',
        description: '',
        edit_code: ''
      },
      errorMessage: null,
      fieldErrors: {}
    }
  },

  created () {
    this.loadForm(this.transporteur)
    if (this.transporteur.is_locked) {
      api.mailEditCode(this.transporteur.siret)
    }
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
          this.form[field] = transporteur[field] || ''
        }
      }
    },

    async update () {
      const data = await api.updateTransporteur(this.transporteur.siret, this.form)
      if (data.errors) {
        if (data.errors.main && data.errors.main.message) {
          this.errorMessage = data.errors.main.message
        }

        if (data.errors.fields) {
          this.fieldErrors = data.errors.fields
        }
      } else {
        // Success
        this.$store.commit('ADD_MESSAGE', {
          message: {
            color: null,
            text: `Transporteur « ${this.transporteur.enseigne} » enregistré.`
          }
        })
        // Redirect
        router.push({name: 'transporteur_detail', transporteurSiret: this.transporteur.siret})
      }
    }
  }
}
</script>

<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm11 md9 lg8 xl6)
        router-link(:to="{name: 'search', params: {keepPreviousSearch: true}}").d-inline-flex.align-center.adock-no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Retour aux résultats
        v-card
          TransporteurCardHeader(:transporteur="transporteur")
          v-container(grid-list-lg)
            v-alert(
              v-if="errorMessage"
              type="error"
              :value="true"
            ) {{ errorMessage }}
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-model="form.telephone"
                  required
                  input="telephone"
                  label="Téléphone"
                  :error-messages="fieldErrors.telephone"
                  data-cy="inputTelephone"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-model="form.email"
                  input="email"
                  label="Adresse électronique"
                  :error-messages="fieldErrors.email"
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
                  :error-messages="fieldErrors.working_area_departements"
                  hint="Numéros des départements séparés par des espaces ou virgules"
                  :rules="[() => form.working_area !== 'DEPARTEMENT' || (form.working_area === 'DEPARTEMENT' && form.working_area_departements.length > 0) || 'Des départements doivent être renseignés quand l\\'aire de travail est départementale.']"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-select(
                  :items="options.specialities"
                  v-model="form.specialities"
                  label="Spécialités"
                  :error-messages="fieldErrors.specialities"
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
                  :error-messages="fieldErrors.website"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  v-model="form.description"
                  multi-line
                  :rows="2"
                  label="Description de l'activité"
                  :error-messages="fieldErrors.description"
                )
            v-layout(wrap)
              v-flex(xs12 offset-md1 md5)
                v-text-field(
                  v-if="transporteur.is_locked"
                  v-model="form.edit_code"
                  type="integer"
                  mask="######"
                  :counter="6"
                  label="Code de modification"
                  :hint="`Copier dans ce champ le code envoyé à l'instant à « ${transporteur.email} »`"
                  :error-messages="fieldErrors.edit_code"
                )
              v-flex.adock-align-right(xs12 md5)
                v-btn(:to="{name: 'transporteur_detail', params: { transporteurSiret: transporteur.siret }}") Annuler
                v-btn(color="primary" @click.native="update")
                  v-icon(v-if="transporteur.is_locked" left) lock
                  | Valider
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
