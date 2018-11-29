<template lang="pug">
v-container(fluid fill-height)
  v-layout(row justify-center align-center)
    v-flex(xs4 text-xs-center)
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

<script>
export default {
  name: 'view-error',

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
