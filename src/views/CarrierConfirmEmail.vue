<template lang="pug">
v-container(fluid fill-height)
  v-layout(row justify-center align-center)
    v-flex(xs6 text-xs-center)
      div(v-if="waiting")
        h4 Confirmation de l'adresse électronique en cours...
        br
        v-progress-circular(
          :indeterminate="true"
          color="primary"
        )
      template(v-else)
        div(v-if="status === 200")
          h3 {{ message }}
            v-icon done
          p
            | La fiche transporteur
            |
            router-link(:to="{name: 'carrier_detail', params: {carrierSiret: this.carrierSiret}}") {{ carrierSiret }}
            |
            | est maintenant verrouillée.
        div(v-else)
          h3 {{ message }}
          p(v-if="status === 400") Le jeton a peut être expiré ou a déjà été utilisé.
</template>

<script>
import api from "@/api";

export default {
  name: "confirm-email",

  props: {
    carrierSiret: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      waiting: true,
      message: "",
      status: null
    };
  },

  created() {
    api.confirmEmail(this.carrierSiret, this.token).then(data => {
      this.waiting = false;
      this.message = data.message;
      this.status = data.status;
    });
  }
};
</script>
