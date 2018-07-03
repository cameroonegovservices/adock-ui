<script>
export default {
  name: 'ViewError',
  props: {
    fallbackUrl: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: false
    },
    status: {
      type: Number,
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
      p(v-if="message") {{ message }}
      p(v-else) Cette erreur survient lors d'un problème de connexion à Internet ou d'une indisponibilité du serveur.
      v-btn(
        v-if="fallbackUrl"
        :to="fallbackUrl"
        color="primary"
      )
        span(v-if="status === 404") Retour
        span(v-else) Essayer à nouveau
      v-btn(
        v-else
        @click="reload()"
        color="primary"
      ) Redémarrer l'application
</template>
