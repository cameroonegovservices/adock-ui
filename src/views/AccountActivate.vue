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
        p(v-if="status === 200") Le compte utilisateur « {{ displayUser }} » est maintenant actif.
</template>

<script>
import { displayUserMixin } from "@/mixins";
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
      waiting: true,
      message: "Cliquez sur le lien qui vous a été envoyé par courriel.",
      status: null
    };
  },

  async mounted() {
    // FIXME then on 400?
    if (this.userId && this.token) {
      const data = await api.accountActivate(this.userId, this.token);
      this.status = data.status;
      this.message = data.message;
      this.waiting = false;
      if (data.token) {
        this.$store.dispatch("userLogIn", data);
      }
    }
  }
};
</script>
