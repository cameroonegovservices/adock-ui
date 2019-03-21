<template lang="pug">
v-container(fluid fill-height)
  v-layout(row justify-center align-center)
    v-flex(xs6 text-xs-center)
      div(v-if="waiting")
        h4 {{ message }}
        br
        v-progress-circular(
          :indeterminate="true"
          color="primary"
        )
      div(v-else)
        h3 {{ message }}
          v-icon(v-if="status === 200") done
        p(v-if="user") Le compte utilisateur « {{ displayUser }} » est maintenant actif.
</template>

<script>
import { displayUserMixin } from "@/mixins";
import api from "@/api";
import { setTimeout } from "timers";

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
      waiting: true,
      message: "Cliquez sur le lien qui vous a été envoyé par courriel.",
      status: null
    };
  },

  async mounted() {
    if (this.userId && this.token) {
      const url = api.getAccountActivateUrl(this.userId, this.token);
      const response = await api.get(url);
      this.waiting = false;
      this.status = response.status;
      this.message = response.data.message;

      if (response.status === 200 && response.data.token) {
        await this.$store.dispatch("userLogIn", response.data);
        setTimeout(() => {
          this.$router.push({ name: "search" });
        }, 3000);
      }
    }
  }
};
</script>
