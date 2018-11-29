<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm11 md9 lg8 xl6)
        router-link(:to="{name: 'search', params: {keepPreviousSearch: true}}").d-inline-flex.align-center.adock-no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Retour aux résultats
        v-card
          CarrierCardHeader(
            :carrier="carrier"
            :detail-url="detailUrl"
            :with-edit-button="!carrier.deleted_at"
          )
          v-container(grid-list-lg)
            v-layout(v-if="carrier.deleted_at")
              v-flex(offset-xs1 xs10)
                v-alert(
                  :value="true"
                  type="warning"
                  color="orange"
                )
                  | Cet établissement est absent du registre transports de marchandises depuis le
                  | {{ carrier.deleted_at | asLocaleDate }}. Cela peut faire suite à un déménagement ou à une
                  | cessation d'activité.
            v-layout(v-if="carrier.sirene_deleted_at")
              v-flex(offset-xs1 xs10)
                v-alert(
                  :value="true"
                  type="warning"
                  color="orange"
                )
                  | Cet établissement est absent de la base de données Sirene de l'Insee.
                  | Certaines informations telles que le code APE ou l'adresse sont indisponibles.
                  | La cause peut être l'opposition au démarchage commercial ou la cessation d'activité.
                  | Nous vous invitons à contacter le
                  |
                  a(href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F24023") Centre de formalités des entreprises
                  |
                  | dont vous dépendez.
            v-layout
              v-flex(xs4 offset-md1 md5) Téléphone
              v-flex.adock-align-right(xs8 md5)
                a(
                  v-if="carrier.telephone"
                  :href="'tel:' + carrier.telephone"
                ) {{ carrier.telephone }}
                span(v-else) Non renseigné
            v-layout
              v-flex(xs4 offset-md1 md5) Email
              v-flex.adock-align-right(xs8 md5)
                a(
                  v-if="carrier.email"
                  :href="'mailto:' + carrier.email"
                ) {{ carrier.email }}
                span(v-else) Non renseigné
            v-layout(v-if="carrier.website")
              v-flex(xs4 offset-md1 md5) Site Web
              v-flex.adock-align-right(xs8 md5)
                a(:href="carrier.website") {{ carrier.website }}
            v-layout
              v-flex(xs8 offset-md1 md5) Aire de travail
              v-flex.adock-align-right(xs6 md5) {{ choices.workingAreas[carrier.working_area] }}
            v-layout(v-if="carrier.working_area === 'DEPARTEMENT' || carrier.working_area === 'REGION'")
              v-flex(xs5 offset-md1 md5) Départements livrés
              v-flex.adock-align-right(xs7 md5) {{ carrier.working_area_departements | asJoinedString }}
            v-layout
              v-flex(xs4 offset-md1 md5) Spécialités
              v-flex.adock-align-right(xs8 md5) {{ displaySpecialities }}
            v-layout(v-if="carrier.description")
              v-flex(xs4 offset-md1 md5) Description de l'activité
              v-flex.adock-align-right(xs8 md5) {{ carrier.description }}
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-divider
            v-layout
              v-flex(xs12)
                span.adock-section-title.pl-4 Administratif
            v-layout
              v-flex(xs4 offset-md1 md5) SIRET
              v-flex.adock-align-right(xs8 md5) {{ carrier.siret }}
            v-layout
              v-flex(xs4 offset-md1 md5) N° TVA
              v-flex.adock-align-right(xs8 md5) {{ carrier.numero_tva }}
            v-layout
              v-flex(xs4 offset-md1 md5) Raison sociale
              v-flex.adock-align-right(xs8 md5) {{ carrier.raison_sociale }}
            v-layout
              v-flex(xs4 offset-md1 md5) Adresse
              v-flex.adock-align-right(xs8 md5) {{ carrier.adresse }}
            v-layout
              v-flex(xs4 offset-md1 md5) Ville
              v-flex.adock-align-right(xs8 md5) {{ carrier.code_postal }} {{ carrier.ville }}
            v-layout(v-if="carrier.latitude")
              v-flex(xs12 offset-md1 md10)
                div#map
            v-layout(v-if="carrier.debut_activite")
              v-flex(xs4 offset-md1 md5) Début d'activité
              v-flex.adock-align-right(xs8 md5) {{ carrier.debut_activite | asLocaleDate }}
            v-layout
              v-flex(xs4 offset-md1 md5) Gestionnaire
              v-flex.adock-align-right(xs8 md5) {{ carrier.gestionnaire }}
            template(v-if="carrier.lti_numero")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Licence LTI (léger)
                v-flex.adock-align-right(xs6 md5) {{ carrier.lti_numero }}
              v-layout
                v-flex(xs4 offset-md1 md5) validité
                v-flex.adock-align-right(xs8 md5) {{ carrier.lti_date_debut | asLocaleDate }} au {{ carrier.lti_date_fin | asLocaleDate }}
              v-layout
                v-flex(xs4 offset-md1 md5) nombre
                v-flex.adock-align-right(xs8 md5) {{ carrier.lti_nombre }}
            template(v-if="carrier.lc_numero")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Licence LC (lourd, + 3,5 tonnes)
                v-flex.adock-align-right(xs6 md5) {{ carrier.lc_numero }}
              v-layout
                v-flex(xs4 offset-md1 md5) validité
                v-flex.adock-align-right(xs8 md5) {{ carrier.lc_date_debut | asLocaleDate }} au {{ carrier.lc_date_fin | asLocaleDate }}
              v-layout
                v-flex(xs4 offset-md1 md5) nombre
                v-flex.adock-align-right(xs8 md5) {{ carrier.lc_nombre }}
            template(v-if="carrier.objectif_co2")
              br
              v-layout
                v-flex(xs6 offset-md1 md5) Objectif CO2
                v-flex.adock-align-right(xs6 md5) {{ choices.objectifCO2[carrier.objectif_co2] }}
              v-layout
                v-flex(xs4 offset-md1 md5) période
                v-flex.adock-align-right(xs8 md5) {{ carrier.objectif_co2_begin | asLocaleDate }} au {{ carrier.objectif_co2_end | asLocaleDate }}
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-divider
            v-layout
              v-flex(xs12)
                span.adock-section-title.pl-4 Autres établissements de l'entreprise
            v-layout
              v-flex(v-if="carrier.subsidiaries && carrier.subsidiaries.length > 0" xs12 offset-md1)
                v-data-table(
                  :headers='subsidiariesHeaders'
                  :items='carrier.subsidiaries'
                  hide-actions
                  class='elevation-1'
                  must-sort
                )
                  template(
                    slot='items'
                    slot-scope='props'
                  )
                    tr(:class="{'adock-tr-deleted': props.item.deleted_at || props.item.sirene_deleted_at }")
                      td
                        router-link(:to="{name: 'carrier_detail', params: {carrierSiret: props.item.siret}}") {{ props.item.siret }}
                        span &nbsp;
                        v-tooltip(top)
                          span(slot="activator")
                            v-icon(v-if="props.item.is_siege" small) domain
                          div
                            span Siège social
                      td {{ props.item.code_postal }}
                      td {{ props.item.ville }}
                      td {{ props.item.debut_activite | asLocaleDate }}
              v-flex(v-else xs10 offset-md1)
                span Aucun

</template>

<style lang="stylus">
.adock-no-link
  color: inherit
  text-decoration: none

.adock-align-right
  text-align: right

.adock-section-title
  font-size: 16px
  color: grey

.adock-tr-deleted
  color: grey

a[href^="tel:"], a[href^="mailto:"]
  text-decoration: none

a[href^="tel:"]:before
  content: "\260e"
  margin-right: 0.5em

#map
  width: 100%
  height: 256px
  text-shadow: 0 0 2px #fff
  border: 1px solid #ccc
  z-index: 1
</style>

<script>
import L from 'leaflet'
import { mapState } from 'vuex'

import { routeLoadCarrier } from '@/routeLoaders'
import CarrierCardHeader from '@/components/CarrierCardHeader'

export default {
  name: 'Detail',

  props: {
    carrier: {
      type: Object,
      required: true
    }
  },

  components: {
    CarrierCardHeader
  },

  data () {
    return {
      subsidiariesHeaders: [
        {
          text: 'SIRET',
          value: 'siret'
        },
        {
          text: 'Code postal',
          value: 'code_postal'
        },
        {
          text: 'Ville',
          value: 'ville'
        },
        {
          text: "Début d'activité",
          value: 'debut_activite'
        }
      ]
    }
  },

  created () {
    this.map = null
  },

  mounted () {
    this.renderMap()
  },

  beforeUpdate () {
    if (this.map) {
      // FIXME Move marker and center
      this.map.remove()
      this.map = null
    }
  },

  updated () {
    this.$nextTick(() => {
      this.renderMap()
    })
  },

  async beforeRouteEnter (routeTo, routeFrom, next) {
    next(
      await routeLoadCarrier(
        routeTo, routeFrom,
        response => { routeTo.params.carrier = response.carrier }
      )
    )
  },

  async beforeRouteUpdate (routeTo, routeFrom, next) {
    next(
      await routeLoadCarrier(
        routeTo, routeFrom,
        response => { routeTo.params.carrier = response.carrier }
      )
    )
  },

  computed: {
    detailUrl () {
      return `https://${process.env.VUE_APP_HOSTNAME}${this.$router.currentRoute.path}`
    },

    displaySpecialities () {
      if (this.carrier.specialities == null) {
        return 'Non renseigné'
      } else if (this.carrier.specialities.length === 0 || this.choices.specialities == null) {
        return 'Aucune'
      } else {
        return this.carrier.specialities.map(speciality => this.choices.specialities[speciality]).join(', ')
      }
    },
    ...mapState([
      'choices'
    ])
  },

  methods: {
    renderMap () {
      if (this.carrier.latitude) {
        const center = [this.carrier.latitude, this.carrier.longitude]
        this.map = L.map('map', {
          center,
          zoom: 12,
          scrollWheelZoom: false
        })
        const tileLayer = L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            detectRetina: true
          }
        )
        tileLayer.addTo(this.map)
        L.marker(center).addTo(this.map)
      }
    }
  },

  filters: {
    asJoinedString (value) {
      return value ? value.join(', ') : ''
    },

    asLocaleDate (value) {
      if (value == null) {
        return ''
      }
      return new Date(value).toLocaleDateString()
    }
  }
}
</script>
