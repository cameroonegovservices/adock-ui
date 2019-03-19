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
    const params = {
      code: this.$route.query.code,
      state: this.$route.query.state
    };
    const response = await api.get(api.franceConnectCallbackUrl, params);
    this.waiting = false;
    if (response.status === 200) {
      const data = {
        tokenType: response.data.token_type,
        token: response.data.token,
        expiresIn: response.data.expires_in,
        idToken: response.data.id_token
      };
      await this.$store.dispatch("userLogIn", data);
      this.$store.commit("MESSAGE_ADD", {
        message: `Connecté en tant que « ${
          this.$store.state.user.email
        } » via FranceConnect.`
      });
      this.$router.push({
        name: "search"
      });
    } else {
      this.message = response.data.message || "";
    }
  }
};
</script>
