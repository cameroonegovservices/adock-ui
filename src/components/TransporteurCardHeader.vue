<template lang="pug">
v-img.white--text(:src="roadPicture" height="200px")
  v-container(fill-height fluid)
    v-layout.pa-4(column reverse)
      v-flex.flex-bottom(xs10)
        v-layout(align-end)
          v-flex(xs10)
            h3.headline {{ transporteur.enseigne }}
            span.white--text.text--darken-1 {{ transporteur.libelle_ape }}
            br
            v-btn.ma-0(
              v-if="withButton && !transporteur.deleted_at"
              dark
              :color="transporteur.completeness === 100 ? 'green' : 'orange'"
              :to="{name: 'transporteur_edit', params: {transporteurSiret: transporteur.siret}}"
            )
              v-icon(v-if="transporteur.is_locked" left) lock
              span(v-if="transporteur.completeness === 100") Modifier les informations
              span(v-else) Compléter les informations
          v-flex(xs2)
            CompletenessIndicator(:percent="transporteur.completeness")
            img.adock-objectif-co2.elevation-16(v-if="transporteur.objectif_co2" src="@/assets/logo-objectif-co2.png")
</template>

<script>
import roadPicture from '@/assets/road.jpg'
import CompletenessIndicator from '@/components/CompletenessIndicator'

export default {
  name: 'TransportCardHeader',

  props: {
    transporteur: {
      type: Object,
      required: true
    },

    withButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    CompletenessIndicator
  },

  created () {
    this.roadPicture = roadPicture
  }
}
</script>

<style lang="stylus">
.adock-transporteur .adock-objectif-co2
  width: 40px
  border-radius: 4px
  margin-left: 18px
</style>
