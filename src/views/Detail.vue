
<script>
import { mapState } from 'vuex'

import TransporteurCardHeader from '@/components/TransporteurCardHeader'

export default {
  name: 'Detail',

  props: {
    transporteur: {
      type: Object,
      required: true
    }
  },

  components: {
    TransporteurCardHeader
  },

  computed: {
    displaySpecialities () {
      if (this.transporteur.specialities && this.choices.specialities) {
        return this.transporteur.specialities.map(speciality => this.choices.specialities[speciality]).join(', ')
      } else {
        return 'Non renseigné'
      }
    },
    ...mapState([
      'choices'
    ])
  },

  filters: {
    asJoinedString (value) {
      return value ? value.join(', ') : ''
    },

    asLocaleDate (value) {
      return new Date(value).toLocaleDateString()
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
          TransporteurCardHeader(:transporteur="transporteur" :with-button="!transporteur.deleted_at")
          v-container(grid-list-lg)
            v-layout(v-if="!transporteur.in_sirene")
              v-flex(offset-xs1 xs10)
                v-alert(
                  :value="true"
                  type="warning"
                  color="orange"
                )
                  | Ce transporteur est présent dans le registre mais absent de la base de données Sirène de l'Insee.
                  | Certaines informations telles que le code APE ou l'adresse sont indisponibles.
                  | La cause peut être l'opposition au démarchage commercial.
            v-layout(v-if="transporteur.deleted_at")
              v-flex(offset-xs1 xs10)
                v-alert(
                  :value="true"
                  type="error"
                )
                  | Ce transporteur a été radié du registre des transports de marchandises le
                  | {{ transporteur.deleted_at | asLocaleDate }}.
            v-layout
              v-flex(xs6 offset-md1 md5) Téléphone
              v-flex.adock-align-right(xs6 md5)
                a(
                  v-if="transporteur.telephone"
                  :href="'tel:' + transporteur.telephone"
                ) {{ transporteur.telephone }}
                span(v-else) Non renseigné
            v-layout
              v-flex(xs6 offset-md1 md5) Email
              v-flex.adock-align-right(xs6 md5)
                a(
                  v-if="transporteur.email"
                  :href="'mailto:' + transporteur.email"
                ) {{ transporteur.email }}
                span(v-else) Non renseigné
            v-layout
              v-flex(xs6 offset-md1 md5) Aire de travail
              v-flex.adock-align-right(xs6 md5) {{ choices.workingAreas[transporteur.working_area] }}
            v-layout(v-if="transporteur.working_area === 'DEPARTEMENT'")
              v-flex(xs6 offset-md1 md5) Départements livrés
              v-flex.adock-align-right(xs6 md5) {{ transporteur.working_area_departements | asJoinedString }}
            v-layout
              v-flex(xs6 offset-md1 md5) Spécialités
              v-flex.adock-align-right(xs6 md5) {{ displaySpecialities }}
            v-layout(v-if="transporteur.website")
              v-flex(xs6 offset-md1 md5) Site Web
              v-flex.adock-align-right(xs6 md5)
                a(:href="transporteur.website") {{ transporteur.website }}
            v-layout(v-if="transporteur.description")
              v-flex(xs6 offset-md1 md5) Description de l'activité
              v-flex.adock-align-right(xs6 md5) {{ transporteur.description }}
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-divider
            v-layout
              v-flex(xs6 offset-md1 md5) SIRET
              v-flex.adock-align-right(xs6 md5) {{ transporteur.siret }}
            v-layout
              v-flex(xs6 offset-md1 md5) N° TVA
              v-flex.adock-align-right(xs6 md5) {{ transporteur.numero_tva }}
            v-layout
              v-flex(xs6 offset-md1 md5) Raison sociale
              v-flex.adock-align-right(xs6 md5) {{ transporteur.raison_sociale }}
            v-layout
              v-flex(xs6 offset-md1 md5) Adresse
              v-flex.adock-align-right(xs6 md5) {{ transporteur.adresse }}
            v-layout
              v-flex(xs6 offset-md1 md5) Ville
              v-flex.adock-align-right(xs6 md5) {{ transporteur.code_postal }} {{ transporteur.ville }}
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
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lti_date_debut | asLocaleDate }} au {{ transporteur.lti_date_fin | asLocaleDate }}
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
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lc_date_debut | asLocaleDate }} au {{ transporteur.lc_date_fin | asLocaleDate }}
              v-layout
                v-flex(xs6 offset-md1 md5) nombre
                v-flex.adock-align-right(xs6 md5) {{ transporteur.lc_nombre }}
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

a[href^="tel:"], a[href^="mailto:"]
  text-decoration: none

a[href^="tel:"]:before
  content: "\260e"
  margin-right: 0.5em

</style>
