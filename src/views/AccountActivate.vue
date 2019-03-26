<template lang="pug">
v-container(fluid fill-height)
  v-layout(row justify-center align-center)
    v-flex(xs6 text-xs-center)
      div(v-if="waiting")
        h4 Votre compte utilisateur a bien été créé.
        h4 Pour l’activer, cliquez sur le lien envoyé à votre adresse email.
        br
        v-progress-circular(
          :indeterminate="true"
          color="primary"
        )
      div(v-else)
        p(v-if="user") Le compte utilisateur « {{ displayUser }} » est maintenant activé.
          v-icon(
            v-if="status === 200"
            color="success"
          ) done
        v-alert(
          v-else
          type="error"
          :value="true"
        ) {{ errorMessage }}
</template>

<script>
import { displayUserMixin } from "@/mixins";
import { getRouterLocationWhenLogged } from "@/router";
import api from "@/api";

export default {
  name: "account-activate",

  props: {
    userId: {
      type: String,
      required: false,
      default: ""
    },
    token: {
      type: String,
      required: false,
      default: ""
    }
  },

  mixins: [displayUserMixin],

  data() {
    return {
      errorMessage: null,
      status: null,
      waiting: true
    };
  },

  async mounted() {
    if (this.userId && this.token) {
      const url = api.getAccountActivateUrl(this.userId, this.token);
      const response = await api.get(url);
      this.status = response.status;
      if (response.status === 200 && response.data.token) {
        // FIXME RC
        await this.$store.dispatch("userLogIn", response.data);
        const routerLocation = getRouterLocationWhenLogged(this.user);
        // Wait for proper login
        this.waiting = false;
        // New account should validate CGU each time but I think it's better to not hard code that.
        setTimeout(() => {
          this.$router.push(routerLocation);
        }, 2000);
      } else {
        this.waiting = false;
        this.errorMessage = response.data.message;
      }
    }
  }
};
</script>
