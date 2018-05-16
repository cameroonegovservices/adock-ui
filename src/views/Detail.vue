
<script>
import { mapState } from 'vuex'

import api from '@/api.js'
import TransporteurCardHeader from '@/components/TransporteurCardHeader'

export default {
  name: 'Detail',

  props: {
    transporteurSiret: {
      type: String,
      required: true
    }
  },

  components: {
    TransporteurCardHeader
  },

  data () {
    return {
      transporteur: {}
    }
  },

  async mounted () {
    const response = await api.fetchTransporteur(this.transporteurSiret)
    if (response.errors === null) {
      this.transporteur = response.transporteur
    } else {
      this.$router.push({name: 'error', params: { errorUrl: this.$router.currentRoute.path }})
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
      'choices'
    ])
  },

  filters: {
    asDepartements (value) {
      return value.map(dep => String(dep).padStart(2, '0')).join(', ')
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
          span.subheading.no-wrap Recherche
        v-card
          TransporteurCardHeader(:transporteur="transporteur" :with-button="true")
          v-container(grid-list-lg)
            v-layout
              v-flex(xs6 offset-md1 md5) SIRET
              v-flex.adock-align-right(xs6 md5) {{ transporteur.siret }}
            v-layout
              v-flex(xs6 offset-md1 md5) N° TVA
              v-flex.adock-align-right(xs6 md5) {{ transporteur.numero_tva }}
            v-layout
              v-flex(xs6 offset-md1 md5) Adresse
              v-flex.adock-align-right(xs6 md5) {{ transporteur.adresse }}
            v-layout
              v-flex(xs6 offset-md1 md5) Ville
              v-flex.adock-align-right(xs6 md5) {{ transporteur.ville }}
            v-layout
              v-flex(xs6 offset-md1 md5) Gestionnaire
              v-flex.adock-align-right(xs6 md5) {{ transporteur.gestionnaire }}
            template(v-if="transporteur.lti_numero")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Licence LTI (léger)
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lti_numero }}
              v-layout
                v-flex(xs6 offset-md1 md5) validité
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lti_date_debut }} au {{ transporteur.lti_date_fin }}
              v-layout
                v-flex(xs6 offset-md1 md5) nombre
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lti_nombre }}
            template(v-if="transporteur.lc_numero")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Licence LC (lourd, + 3,5 tonnes)
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lc_numero }}
              v-layout
                v-flex(xs6 offset-md1 md5) validité
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lc_date_debut }} au {{ transporteur.lc_date_fin }}
              v-layout
                v-flex(xs6 offset-md1 md5) nombre
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lc_nombre }}
            v-layout
              v-flex(xs6 offset-md1 md5)
                span.adock-section.grey--text.text--darken-1 Informations complémentaires
            v-layout
              v-flex(xs6 offset-md1 md5) Téléphone
              v-flex.adock-align-right(xs6 md5) {{ transporteur.telephone }}
            v-layout
              v-flex(xs6 offset-md1 md5) Email
              v-flex.adock-align-right(xs6 md5) {{ transporteur.email }}
            v-layout
              v-flex(xs6 offset-md1 md5) Aire de travail
              v-flex.adock-align-right(xs6 md5) {{ choices.workingAreas[transporteur.working_area] }}
            v-layout(v-if="transporteur.working_area === 'DEPARTEMENT'")
              v-flex(xs6 offset-md1 md5) Départements livrés
              v-flex.adock-align-right(xs6 md5) {{ transporteur.working_area_departements | asDepartements }}
            v-layout
              v-flex(xs6 offset-md1 md5) Spécialités
              v-flex.adock-align-right(xs6 md5) {{ displaySpecialities }}
            v-layout(v-if="transporteur.website")
              v-flex(xs6 offset-md1 md5) Site Web
              v-flex.adock-align-right(xs6 md5)
                a(:href="transporteur.website") {{ transporteur.website }}
            v-layout
              v-flex.adock-align-right(xs12 md11)
                v-btn.ma-0(
                  dark
                  :color="transporteur.completeness === 100 ? 'green' : 'orange'"
                  :to="{name: 'transporteur_edit', params: {transporteurSiret}}"
                )
                  span(v-if="transporteur.completeness === 100") Modifier les informations
                  span(v-else) Compléter les informations
</template>

<style lang="stylus">
.adock-no-link
  color: inherit
  text-decoration: none

.adock-align-right
  text-align: right

.adock-section
  padding-top: 0.5em
  margin-left: -0.5em

.flex.flex-bottom
  flex-basis: 0
</style>
