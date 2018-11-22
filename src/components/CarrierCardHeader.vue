<template lang="pug">
v-img.white--text(:src="getRoadPicture" height="200px")
  v-container(fill-height fluid)
    v-layout.pa-4(column reverse)
      v-flex.flex-bottom(xs10)
        v-layout(align-end)
          v-flex(xs12 sm10)
            v-layout(align-start justify-start)
              v-flex(shrink)
                span.headline {{ carrier.enseigne }}
                br
                span.white--text.text--darken-1 {{ carrier.libelle_ape }}
              v-flex(shrink)
                v-tooltip(
                  activator=".clipboard"
                  top
                  v-model="copied"
                )
                  span Adresse copiée dans le presse-papier (Ctrl + v pour coller).
                v-btn.clipboard(
                  small
                  fab
                  :data-clipboard-text="detailUrl"
                )
                  v-icon share
            br
            v-btn.ma-0(
              v-if="withEditButton"
              dark
              :color="carrier.completeness === 100 ? 'green' : 'orange'"
              :to="{name: 'carrier_edit', params: {carrierSiret: carrier.siret}}"
            )
              v-icon(v-if="carrier.is_locked" left) lock
              span(v-if="carrier.completeness === 100") Modifier les informations
              span(v-else) Compléter les informations
          v-flex(hidden-sm-and-down sm1)
            CompletenessIndicator(v-if="withEditButton" :percent="carrier.completeness")
          v-flex(hidden-xs-only v-if="carrier.objectif_co2")
            img.adock-objectif-co2.elevation-16(
              v-if="carrier.objectif_co2 === 'ENLISTED'"
              src="@/assets/logo-objectif-co2-charte.jpg"
            )
            img.adock-objectif-co2.elevation-16(
              v-if="carrier.objectif_co2 === 'LABELLED'"
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
import ClipboardJS from 'clipboard'

import CompletenessIndicator from '@/components/CompletenessIndicator'

import roadPicture from '@/assets/road.jpg'
import roadDisabledPicture from '@/assets/road-disabled.jpg'

export default {
  name: 'TransportCardHeader',

  props: {
    carrier: {
      type: Object,
      required: true
    },

    detailUrl: {
      type: String,
      required: false,
      default: ''
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

  data () {
    return {
      copied: false
    }
  },

  created () {
    let clipboard = new ClipboardJS('.clipboard')
    clipboard.on('success', e => {
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 3000)
    })
  },

  computed: {
    getRoadPicture () {
      return this.carrier.deleted_at ? roadDisabledPicture : roadPicture
    }
  }
}
</script>