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
        p La cause est peut être une mauvaise connexion à Internet ou une indisponibilité du serveur.
        v-btn(
          :to="errorUrl"
          color="primary"
        ) Essayer à nouveau
</template>
