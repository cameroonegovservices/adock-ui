<template lang="pug">
  v-list(subheader)
    v-subheader {{ transporteurs.length }} transporteurs pour la recherche «&nbsp;{{ searchQuery }}&nbsp;»
    v-list-tile(v-for="transporteur in transporteurs", :key="transporteur.siret", @click="")
      v-list-tile-content
        v-list-tile-title(v-html="transporteur.raison_sociale")
        v-list-tile-sub-title {{ transporteur.ville }}
      v-list-tile-action
        v-icon chat_bubble
</template>

<script>
export default {
  name: 'TransporteurList',
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    transporteurs: {
      type: Array,
      required: true
    }
  }
}
</script>
