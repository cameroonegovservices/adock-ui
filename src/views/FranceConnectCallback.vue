<template lang="pug">
  v-container(fluid fill-height)
    v-layout(row justify-center align-center)
        v-flex(xs6 text-xs-center)
          div(v-if="waiting")
            h4 Envoi de la réponse France Connect au serveur A Dock
            br
            v-progress-circular(
              :indeterminate="true"
              color="primary"
            )
          template(v-else)
            div(v-if="status === 200")
              h3 Connecté avec succès
                v-icon(color="success") done
            div(v-else)
              h3 {{ message }}
                v-icon(color="error") error
              p La procédure de connexion via France Connect a échoué.
</template>

<script>
import api from "@/api";
import { getRouterLocationWhenLogged, getNextUrlFromRoute } from "@/router";

export default {
  name: "franceconnect-callback",

  data() {
    return {
      message: "",
      status: null,
      waiting: true
    };
  },

  async mounted() {
    const nextUrl = getNextUrlFromRoute(this.$route);
    // nextUrl is provided here only for control
    const params = {
      code: this.$route.query.code,
      state: this.$route.query.state,
      next: nextUrl
    };
    const response = await api.get(api.franceConnectCallbackUrl, params);
    this.status = response.status;
    this.waiting = false;
    if (response.status === 200) {
      await this.$store.dispatch("userLogIn", response.data);
      const routerLocation = getRouterLocationWhenLogged(
        this.$store.state.user,
        nextUrl
      );
      this.$router.push(routerLocation);
    } else {
      this.message = response.data.message || "";
    }
  }
};
</script>
