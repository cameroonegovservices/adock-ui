<template lang="pug">
v-img.white--text(:src="getRoadPicture" height="200px")
  v-container(fill-height fluid)
    v-layout.pa-4(column reverse)
      v-flex.flex-bottom(xs10)
        v-layout(align-end)
          v-flex(xs12 sm10)
            h3.headline {{ transporteur.enseigne }}
            span.white--text.text--darken-1 {{ transporteur.libelle_ape }}
            br
            v-btn.ma-0(
              v-if="withEditButton"
              dark
              :color="transporteur.completeness === 100 ? 'green' : 'orange'"
              :to="{name: 'transporteur_edit', params: {transporteurSiret: transporteur.siret}}"
            )
              v-icon(v-if="transporteur.is_locked" left) lock
              span(v-if="transporteur.completeness === 100") Modifier les informations
              span(v-else) Compléter les informations
          v-flex(hidden-sm-and-down sm1)
            CompletenessIndicator(v-if="withEditButton" :percent="transporteur.completeness")
          v-flex(hidden-xs-only v-if="transporteur.objectif_co2")
            img.adock-objectif-co2.elevation-16(
              v-if="transporteur.objectif_co2 === 'ENLISTED'"
              src="@/assets/logo-objectif-co2-charte.jpg"
            )
            img.adock-objectif-co2.elevation-16(
              v-if="transporteur.objectif_co2 === 'LABELLED'"
              src="@/assets/logo-objectif-co2-label.jpg"
            )
</template>

<style lang="stylus">
.adock-objectif-co2
  display: flex
  border: 6px solid white
  border-radius: 4px
  width: 64px
</style>

<script>
import roadPicture from '@/assets/road.jpg'
import roadDisabledPicture from '@/assets/road-disabled.jpg'
import CompletenessIndicator from '@/components/CompletenessIndicator'

export default {
  name: 'TransportCardHeader',

  props: {
    transporteur: {
      type: Object,
      required: true
    },

    withEditButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    CompletenessIndicator
  },

  computed: {
    getRoadPicture () {
      return this.transporteur.deleted_at ? roadDisabledPicture : roadPicture
    }
  }
}
</script>
