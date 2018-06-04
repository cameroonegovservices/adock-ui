<script>
export default {
  name: 'ResourceError',
  props: {
    errorUrl: {
      type: String,
      required: false
    }
  },
  methods: {
    reload () {
      document.location.assign('/')
    }
  }
}
</script>

<template lang="pug">
v-container(fluid)
    v-layout(row justify-center align-center)
      v-flex(xs4)
        h3 Impossible de charger la ressource demandée.
        p Cette erreur survient lors d'un problème de connexion à Internet ou d'une indisponibilité du serveur.
        v-btn(
          v-if="errorUrl"
          :to="errorUrl"
          color="primary"
        ) Essayer à nouveau
        v-btn(
          v-else
          @click="reload()"
          color="primary"
        ) Redémarrer l'application
</template>
