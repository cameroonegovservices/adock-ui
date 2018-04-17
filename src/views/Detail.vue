<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm11 md9 lg8 xl6)
        router-link(:to="{name: 'search'}").d-inline-flex.align-center.no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Recherche
        v-card
          v-card-media.white--text(:src="roadPicture" height="200px")
            v-layout.pa-4(column reverse)
              v-flex.flex-bottom(xs10)
                v-layout(align-end)
                  v-flex(xs10)
                    h3.headline {{ transporteur.raison_sociale }}
                    span.white--text.text--darken-1 {{ transporteur.libelle_ape }}
                    br
                    v-btn.ma-0(v-if="transporteur.completeness < 100" dark color="orange" @click.native="setEditMode(true)")
                      .
                        Compléter les informations
                  v-flex(xs2)
                    completeness-indicator(:percent="transporteur.completeness")
          v-container(grid-list-lg)
            v-layout
              v-flex(xs6 offset-md1 md5) SIRET
              v-flex.align-right(xs6 md5) {{ transporteur.siret }}
            v-layout
              v-flex(xs6 offset-md1 md5) N° TVA
              v-flex.align-right(xs6 md5) {{ transporteur.numero_tva }}
            v-layout
              v-flex(xs6 offset-md1 md5) Adresse
              v-flex.align-right(xs6 md5) {{ transporteur.adresse }}
            v-layout
              v-flex(xs6 offset-md1 md5) Ville
              v-flex.align-right(xs6 md5) {{ transporteur.ville }}
            v-layout
              v-flex(xs6 offset-md1 md5) Gestionnaire
              v-flex.align-right(xs6 md5) {{ transporteur.gestionnaire }}
            template(v-if="transporteur.lti_numero")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Licence LTI (léger)
                v-flex.align-right(xs6 md5) {{ transporteur.lti_numero }}
              v-layout
                v-flex(xs6 offset-md1 md5) validité
                v-flex.align-right(xs6 md5) {{ transporteur.lti_date_debut }} au {{ transporteur.lti_date_fin }}
              v-layout
                v-flex(xs6 offset-md1 md5) nombre
                v-flex.align-right(xs6 md5) {{ transporteur.lti_nombre }}
            template(v-if="transporteur.lc_numero")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Licence LC (lourd, + 3,5 tonnes)
                v-flex.align-right(xs6 md5) {{ transporteur.lc_numero }}
              v-layout
                v-flex(xs6 offset-md1 md5) validité
                v-flex.align-right(xs6 md5) {{ transporteur.lc_date_debut }} au {{ transporteur.lc_date_fin }}
              v-layout
                v-flex(xs6 offset-md1 md5) nombre
                v-flex.align-right(xs6 md5) {{ transporteur.lc_nombre }}
            v-layout
              v-flex(xs6 offset-md1 md5)
                span.section.grey--text.text--darken-1 Informations complémentaires
            v-layout
              v-flex(xs6 offset-md1 md5) Téléphone
              v-flex.align-right(xs6 md5) {{ transporteur.telephone }}
            v-layout
              v-flex(xs6 offset-md1 md5) Email
              v-flex.align-right(xs6 md5) {{ transporteur.email }}
            v-layout
              v-flex(xs6 offset-md1 md5) Aire de travail
              v-flex.align-right(xs6 md5) {{ choices.workingAreas[transporteur.working_area] }}
            v-layout(v-if="transporteur.working_area === 'DEPARTEMENT'")
              v-flex(xs6 offset-md1 md5) Départements livrés
              v-flex.align-right(xs6 md5) {{ transporteur.working_area_departements | asDepartements }}
            v-layout
              v-flex(xs6 offset-md1 md5) Spécialités
              v-flex.align-right(xs6 md5) {{ displaySpecialities }}
            v-layout
              v-flex.align-right(xs12 md11)
                v-btn(v-if="transporteur.completeness === 100" flat color="green" @click.native="setEditMode(!isEditMode)")
                  v-icon {{ isEditMode ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                  .
                    Modifier les informations
                v-btn.ma-0(v-else flat color="orange" @click.native="setEditMode(!isEditMode)")
                  v-icon {{ isEditMode ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                  .
                    Compléter les informations
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
                    data-cy="inputWorkingArea"
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
                    data-cy="inputSpecialities"
                  )
                  v-btn(color="primary" @click.native="update") Valider
</template>

<script>
import Raven from 'raven-js'
import { mapState } from 'vuex'
import api from '@/api.js'
import roadPicture from '@/assets/road.jpg'
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
    try {
      const response = await api.get(this.getDetailUrl())
      this.loadData(response.data)
    } catch (error) {
      Raven.captureException(error)
    }
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
        } else if (field === 'specialities') {
          // v-select expects [] instead of null
          this.form[field] = this.transporteur[field] || []
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

    setEditMode (value) {
      this.isEditMode = value
      setTimeout(this.scrollForm, 600)
    },

    async update () {
      let response
      try {
        response = await api.patch(this.getDetailUrl(), this.form)
      } catch (error) {
        if (error.response && error.response.data) {
          // Data not validated by server
          this.errors = error.response.data
        } else {
          Raven.captureException(error)
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

.section
  padding-top: 0.5em
  margin-left: -0.5em

.flex.flex-bottom
  flex-basis: 0
</style>
