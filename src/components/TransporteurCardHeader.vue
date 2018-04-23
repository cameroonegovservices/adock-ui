<template lang="pug">
v-card-media.white--text(:src="roadPicture" height="200px")
  v-layout.pa-4(column reverse)
    v-flex.flex-bottom(xs10)
      v-layout(align-end)
        v-flex(xs10)
          h3.headline {{ transporteur.raison_sociale }}
          span.white--text.text--darken-1 {{ transporteur.libelle_ape }}
          br
          v-btn.ma-0(v-if="withButton && transporteur.completeness < 100"
            dark
            color="orange"
            :to="{name: 'transporteur_edit', params: {transporteurSiret: transporteur.siret}}"
          ) Compléter les informations
        v-flex(xs2)
          CompletenessIndicator(:percent="transporteur.completeness")
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
