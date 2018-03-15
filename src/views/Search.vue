<template lang="pug">
  v-container(fill-height)
    v-layout
      v-flex(xs12)
        div.display-1.mt-5 Cherchez et contactez n'importe quel transporteur français
        v-text-field(v-model="searchQuery", label="Numéro de SIREN, SIRET ou nom de l'entreprise",
          hint="Vous pouvez utiliser un SIRET (9 chiffres), un SIRET (15 chiffres) ou le nom partiel de l'entreprise.")
        v-btn(large, color="primary", to="subscribe") Chercher
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchQuery: null
    }
  }
}
</script>
