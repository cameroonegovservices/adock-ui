<template lang="pug">
  v-list(two-line)
    v-subheader(v-if="limit") Seuls les {{ transporteurs.length }} premiers transporteurs pour la recherche «&nbsp;{{ searchParams }}&nbsp;» sont affichés.
    v-subheader(v-else) {{ transporteurs.length }} transporteurs pour la recherche «&nbsp;{{ searchParams }}&nbsp;»
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
    searchParams: {
      type: String,
      required: true
    },
    transporteurs: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      default: 0
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
