<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm10 md7 lg6 xl5)
        router-link(:to="{name: 'search'}").d-inline-flex.align-center.no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Recherche
        v-card
          v-card-media.white--text(:src="roadPicture" height="200px")
            v-container(fill-height fluid)
              v-layout(fill-height)
                v-flex(xs12 align-end flexbox)
                  span.headline Transporteur
          v-card-title(primary-title)
            v-layout(row wrap)
              v-flex(xs12 sm11)
                h3.headline {{ transporteur.raison_sociale }}
                span.grey--text.text--darken-1 {{ transporteur.libelle_ape }}
              v-flex(offset-xs10 xs2 offset-sm0 sm1)
                completeness-indicator(:percent="transporteur.completeness")
          v-container(grid-list-lg,offset-xs1)
            v-layout(row wrap)
              v-flex(xs5) SIRET
              v-flex.align-right(xs6) {{ transporteur.siret }}
            v-layout(row wrap)
              v-flex(xs5) N° TVA
              v-flex.align-right(xs6) {{ transporteur.numero_tva }}
            v-layout(row wrap)
              v-flex(xs5) Adresse
              v-flex.align-right(xs6) {{ transporteur.adresse }}
            v-layout(row wrap)
              v-flex(xs5) Ville
              v-flex.align-right(xs6) {{ transporteur.ville }}
            v-layout(row wrap)
              v-flex(xs5) Gestionnaire
              v-flex.align-right(xs6) {{ transporteur.gestionnaire }}
            template(v-if="transporteur.lti_numero")
              br
              v-layout(row wrap)
                v-flex(xs5) Licence LTI (léger)
                v-flex.align-right(xs6) {{ transporteur.lti_numero }}
              v-layout(row wrap)
                v-flex(xs5) validité
                v-flex.align-right(xs6) {{ transporteur.lti_date_debut }} au {{ transporteur.lti_date_fin }}
              v-layout(row wrap)
                v-flex(xs5) nombre
                v-flex.align-right(xs6) {{ transporteur.lti_nombre }}
            template(v-if="transporteur.lc_numero")
              br
              v-layout(row wrap)
                v-flex(xs5) Licence LC (lourd, + 3,5 tonnes)
                v-flex.align-right(xs6) {{ transporteur.lc_numero }}
              v-layout(row wrap)
                v-flex(xs5) validité
                v-flex.align-right(xs6) {{ transporteur.lc_date_debut }} au {{ transporteur.lc_date_fin }}
              v-layout(row wrap)
                v-flex(xs5) nombre
                v-flex.align-right(xs6) {{ transporteur.lc_nombre }}
            br
            span.grey--text.text--darken-1 Contact
            v-layout(row wrap)
              v-flex(xs5) Téléphone
              v-flex.align-right(xs6) {{ transporteur.telephone }}
            v-layout(row wrap)
              v-flex(xs5) Email
              v-flex.align-right(xs6) {{ transporteur.email }}
            v-layout(row wrap)
              v-flex(xs5) Aire de travail
              v-flex.align-right(xs6) {{ choices.workingAreas[transporteur.working_area] }}
            v-layout(row wrap, v-if="transporteur.working_area === 'DEPARTEMENT'")
              v-flex(xs5) Départements livrés
              v-flex.align-right(xs6) {{ transporteur.working_area_departements | asDepartements }}
            v-layout(row wrap)
              v-flex(xs5) Spécialités
              v-flex.align-right(xs6) {{ displaySpecialities }}
          v-card-actions
            v-spacer
            v-btn(flat, color='blue', @click.native="toggleEditMode")
              v-icon {{ isEditMode ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
              span Modifier les informations
          v-slide-y-transition
            div(v-show="isEditMode")
              v-divider
              v-card-text(id="detailForm")
                v-text-field(
                  v-model="form.telephone"
                  input="telephone"
                  label="Téléphone"
                  :error-messages="errors.telephone"
                  data-cy="inputTelephone"
                )
                v-text-field(
                  v-model="form.email"
                  input="email"
                  label="Adresse électronique"
                  :error-messages="errors.email"
                  data-cy="inputEmail"
                )
                v-select(
                  v-model="form.working_area"
                  :items="options.workingAreas"
                  label="Aire de travail"
                )
                v-text-field(
                  v-if="form.working_area === 'DEPARTEMENT'"
                  v-model="form.working_area_departements"
                  label="Départements livrés"
                  hint="Numéros des départements séparés par des espaces ou virgules"
                )
                v-select(
                  :items="options.specialities"
                  v-model="form.specialities"
                  label="Spécialités"
                  chips
                  multiple
                  deletable-chips
                )
                v-btn(color="primary" @click.native="update") Mettre à jour
</template>

<script>
import { mapState } from 'vuex'

import api from '@/api.js'
import roadPicture from '@/assets/road-1229x768.jpg'
import CompletenessIndicator from '@/components/CompletenessIndicator'

export default {
  props: {
    transporteurSiret: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      transporteur: {},
      form: {
        email: '',
        telephone: '',
        working_area: '',
        working_area_departements: '',
        specialities: []
      },
      isEditMode: false,
      errors: {}
    }
  },

  components: {
    'completeness-indicator': CompletenessIndicator
  },

  created () {
    // FIXME Workaround asset loading, for now...
    this.roadPicture = roadPicture
  },

  async mounted () {
    const response = await api.get(this.getDetailUrl())
    this.loadData(response.data)
  },

  computed: {
    displaySpecialities () {
      if (this.transporteur.specialities && this.choices.specialities) {
        return this.transporteur.specialities.map(speciality => this.choices.specialities[speciality]).join(', ')
      } else {
        return ''
      }
    },

    ...mapState([
      'choices',
      'options'
    ])
  },

  filters: {
    asDepartements (value) {
      return value.map(dep => String(dep).padStart(2, '0')).join(', ')
    }
  },

  methods: {
    loadData (data) {
      this.transporteur = data
      for (let field in this.form) {
        if (field === 'working_area_departements') {
          // Join county numbers with '0' padding for number < 100
          const value = this.transporteur[field]
          this.form[field] = value ? value.join(', ') : ''
        } else {
          this.form[field] = this.transporteur[field]
        }
      }
    },

    getDetailUrl () {
      return `/transporteurs/${this.transporteurSiret}/`
    },

    scrollForm () {
      if (this.isEditMode) {
        this.$vuetify.goTo('#detailForm')
      }
    },

    toggleEditMode () {
      this.isEditMode = !this.isEditMode
      setTimeout(this.scrollForm, 600)
    },

    async update () {
      let response
      try {
        response = await api.patch(this.getDetailUrl(), this.form)
      } catch (error) {
        if (error.response && error.response.data) {
          this.errors = error.response.data
        }
        return
      }

      this.loadData(response.data)
      this.errors = {}
      this.isEditMode = false
    }
  }
}
</script>

<style lang="stylus">
.no-link
  color: inherit
  text-decoration: none

.align-right
  text-align: right
</style>
