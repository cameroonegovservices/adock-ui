<script>
export default {
  name: 'ResourceError',
  props: {
    errorUrl: {
      type: String,
      required: false
    }
  }
}
</script>

<template lang="pug">
v-container(fluid)
    v-layout(row justify-center align-center)
      v-flex(xs4)
        h3 Impossible de charger la ressource demandée.
        p Cela peut venir d'une mauvaise connexion à Internet ou d'une indisponibilité du serveur.
        v-btn(
          :to="errorUrl"
          color="primary"
        ) Essayer à nouveau
</template>
