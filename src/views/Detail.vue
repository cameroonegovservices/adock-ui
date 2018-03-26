<template lang="pug">
  v-container(fluid)
    v-layout(justify-center, row, wrap)
      v-flex(xs12 md9 lg8 xl6)
        router-link(:to="{name: 'search'}").d-inline-flex.align-center.no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Recherche
        v-card
          v-card-media.white--text(:src='roadPicture', height='200px')
            v-container(fill-height, fluid)
              v-layout(fill-height)
                v-flex(xs12, align-end, flexbox)
                  span.headline Transporteur
          v-card-title(primary-title)
            v-layout(row wrap)
              v-flex(xs12 sm11)
                h3.headline {{ transporteur.raison_sociale }}
                span.grey--text.text--darken-1 {{ transporteur.libelle_ape }}
              v-flex(offset-xs10 xs2 offset-sm0 sm1)
                completeness-indicator(:percent="transporteur.completeness")
          v-container(grid-list-lg, offset-xs1)
            v-layout(row, wrap)
              v-flex(xs5) SIRET
              v-flex.align-right(xs6) {{ transporteur.siret }}
            v-layout(row, wrap)
              v-flex(xs5) N° TVA
              v-flex.align-right(xs6) {{ transporteur.numero_tva }}
            v-layout(row, wrap)
              v-flex(xs5) Adresse
              v-flex.align-right(xs6) {{ transporteur.adresse }}
            v-layout(row, wrap)
              v-flex(xs5) Ville
              v-flex.align-right(xs6) {{ transporteur.ville }}
            v-layout(row, wrap)
              v-flex(xs5) Licences plus de 3,5 tonnes
              v-flex.align-right(xs6) {{ transporteur.lower_than_3_5_licenses }}
            v-layout(row, wrap)
              v-flex(xs5) Licences moins de 3,5 tonnes
              v-flex.align-right(xs6) {{ transporteur.greater_than_3_5_licenses }}
            br
            span.grey--text.text--darken-1 Contact
            v-layout(row, wrap)
              v-flex(xs5) Téléphone
              v-flex.align-right(xs6) {{ transporteur.telephone }}
            v-layout(row, wrap)
              v-flex(xs5) Email
              v-flex.align-right(xs6) {{ transporteur.email }}
            v-layout(row, wrap)
              v-flex(xs5) Zone de travail
              v-flex.align-right(xs6) {{ choices.workingAreas[transporteur.working_area] }}
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
                  input="telephone", v-model="telephone", label="Téléphone",
                  :error-messages="errors.telephone", data-cy="inputTelephone"
                )
                v-text-field(
                  input="email", v-model="email", label="Adresse électronique",
                  :error-messages="errors.email", data-cy="inputEmail"
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
      email: '',
      telephone: '',
      isEditMode: false,
      errors: {}
    }
  },

  components: {
    'completeness-indicator': CompletenessIndicator
  },

  created () {
    // Workaround asset loading, for now...
    this.roadPicture = roadPicture
  },

  async mounted () {
    // FIXME error handling
    const response = await api.get(this.getDetailUrl())
    this.loadData(response.data)
  },

  computed: {
    ...mapState([
      'choices'
    ])
  },

  methods: {
    loadData (data) {
      this.transporteur = data
      this.telephone = this.transporteur.telephone
      this.email = this.transporteur.email
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
      setTimeout(this.scrollForm, 400)
    },

    async update () {
      let response
      try {
        response = await api.patch(this.getDetailUrl(), {
          email: this.email,
          telephone: this.telephone
        })
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
