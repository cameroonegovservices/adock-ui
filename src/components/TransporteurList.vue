
<script>
import { mapState } from 'vuex'

export default {
  name: 'TransporteurList',
  props: {
    searchResponseIsEmpty: {
      type: Boolean,
      required: true
    },
    searchParams: {
      type: Object,
      default: null
    },
    // Array or null
    transporteurs: {
      required: true
    },
    limit: {
      type: Number,
      default: 0
    }
  },

  computed: {
    searchParamsForDisplay () {
      const messages = []

      if (this.searchParams === null) {
        return ''
      }

      if (this.searchParams.q !== '') {
        messages.push(`« ${this.searchParams.q} »`)
      }

      if (this.searchParams.licenseTypes && this.searchParams.licenseTypes.length > 0) {
        const licenseTypes = this.searchParams.licenseTypes.map(item => item.text)
        messages.push(`poids « ${licenseTypes.join(', ')} »`)
      }

      if (this.searchParams.departementFrom != null && this.searchParams.departementFrom !== '') {
        messages.push(`enlèvement « ${this.searchParams.departementFrom} »`)
      }

      if (this.searchParams.departementTo != null && this.searchParams.departementTo !== '') {
        messages.push(`livraison « ${this.searchParams.departementTo} »`)
      }

      if (this.searchParams.specialities && this.searchParams.specialities.length > 0) {
        const specialities = this.searchParams.specialities.map(item => item.text)
        messages.push(`spécialités « ${specialities.join(', ')} »`)
      }

      return messages.join(', ')
    },
    ...mapState([
      'choices'
    ])
  }
}
</script>

<template lang="pug">
  div
    v-card.mt-1(v-if="searchResponseIsEmpty")
      v-card-text La recherche avec {{ searchParamsForDisplay }} n'a retourné aucun résultat.
    v-card.mt-1(v-if="transporteurs && transporteurs.length > 0")
      v-list(two-line)
        v-subheader(v-if="limit") Seuls les {{ transporteurs.length }} premiers transporteurs de la recherche {{ searchParamsForDisplay }} sont affichés.
        v-subheader(v-else) {{ transporteurs.length }} transporteurs pour la recherche {{ searchParamsForDisplay }}
        template(v-for="(transporteur, index) in transporteurs")
          v-divider(v-if="index !== 0", :key="'d-' + transporteur.siret")
          v-list-tile(
            :key="transporteur.siret",
            :to="{ name: 'transporteur_detail', params: { transporteurSiret: transporteur.siret }}")
            v-list-tile-content
              v-list-tile-title.adock-transporteur-list-tile {{ transporteur.enseigne }}
              v-list-tile-sub-title.adock-transporteur-list-tile
                | {{ transporteur.code_postal }} {{ transporteur.ville }}
                |  - {{ transporteur.lti_nombre }} LTI - {{ transporteur.lc_nombre }} LC
                |  - {{ choices.workingAreas[transporteur.working_area] }}
            v-list-tile-action.adock-transporteur-list-action
              v-list-tile-action-text
                span {{ transporteur.completeness }}&nbsp;%
</template>

<style lang="stylus">
.adock-transporteur-list-action
  padding-top: 15px
  padding-bottom: 15px

.adock-transporteur-list-tile
  white-space: unset
</style>
