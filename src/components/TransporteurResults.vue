<template lang="pug">
  div
    p(v-if="searchResponseIsEmpty") La recherche avec {{ searchParamsForDisplay }} n'a retourné aucun résultat.
    v-card.mt-1(v-if="transporteurs.length > 0")
      v-list(two-line)
        v-subheader(v-if="limit") Seuls les {{ transporteurs.length }} premiers transporteurs de la recherche {{ searchParamsForDisplay }} sont affichés.
        v-subheader(v-else) {{ transporteurs.length }} transporteurs pour la recherche {{ searchParamsForDisplay }}
        template(v-for="(transporteur, index) in transporteurs")
          v-divider(v-if="index !== 0", :key="'d-' + transporteur.siret")
          v-list-tile(
            :key="transporteur.siret",
            :to="{ name: 'transporteur', params: { transporteurSiret: transporteur.siret }}")
            v-list-tile-content
              v-list-tile-title.transporteur-tile {{ transporteur.raison_sociale }}
              v-list-tile-sub-title.transporteur-tile {{ transporteur.code_postal }} {{ transporteur.ville }}
            v-list-tile-action.transporteur-action
              v-list-tile-action-text
                span.hidden-xs-only Complété à
                span  {{ transporteur.completeness }}&nbsp;%
              v-icon info
</template>

<script>
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
    transporteurs: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      default: 0
    }
  },

  computed: {
    searchParamsForDisplay () {
      let messages = []

      if (this.searchParams === null) {
        return ''
      }

      if (this.searchParams.q !== '') {
        messages.push(`« ${this.searchParams.q} »`)
      }

      let licenseTypes = this.searchParams.licenseTypes.map(item => item.text)
      if (licenseTypes.length > 0) {
        messages.push(`poids « ${licenseTypes.join(', ')} »`)
      }

      if (this.searchParams.departementFrom > 0) {
        messages.push(`départ « ${this.searchParams.departementFrom} »`)
      }

      if (this.searchParams.departementTo > 0) {
        messages.push(`arrivée « ${this.searchParams.departementTo} »`)
      }

      return messages.join(', ')
    }
  }
}
</script>

<style>
.transporteur-action {
  padding-top: 15px;
  padding-bottom: 15px;
}

.transporteur-tile {
  white-space: unset;
}
</style>
