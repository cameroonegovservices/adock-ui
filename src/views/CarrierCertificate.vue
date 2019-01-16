<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm11 md9 lg8 xl6)
        router-link(:to="{name: 'carrier_detail', params: { carrierSiret: carrier.siret }}").d-inline-flex.align-center.adock-no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Retour à la fiche
        v-card
          carrier-card-header(:carrier="carrier")
          v-container(
            ref="mainContent"
            grid-list-lg
          )
            v-alert(
              type="error"
              :value="!!errorMessage"
            ) {{ errorMessage }}
            v-layout
              v-flex(xs12 offset-md1 md10)
                p.subheading Type d'attestation
                v-radio-group(
                  v-model="kind"
                )
                  v-radio(
                    label="Attestation de non emploi de travailleurs étrangers"
                    value="no-foreigners"
                  )
                  v-radio(
                    label="Attestation d'emploi de travailleurs étrangers"
                    value="foreigners"
                  )
            v-layout
              v-flex(xs12 offset-md1 md10)
                p.subheading Responsable de l'entreprise
                v-text-field(
                  v-model="lastName"
                  label="Nom"
                  required
                )
                v-text-field(
                  v-model="firstName"
                  label="Prénom"
                  required
                )
                v-text-field(
                  v-model="position"
                  label="Fonction"
                  required
                )
                v-text-field(
                  v-model="location"
                  label="Lieu"
                  required
                )
            v-layout(wrap)
              v-flex.adock-align-right(xs12 md11)
                v-btn(:to="{name: 'carrier_detail', params: { carrierSiret: carrier.siret }}") Annuler
                v-btn(color="primary" @click.native="sign") Signer
</template>

<style lang="stylus">
.adock-no-link
  color: inherit
  text-decoration: none

.adock-align-right
  text-align: right
</style>

<script>
import { routeLoadCarrier } from "@/routeLoaders";
import CarrierCardHeader from "@/components/CarrierCardHeader";

import api from "@/api";
import { scrollToErrorsMixin } from "@/mixins";

export default {
  name: "carrier-certificate",

  mixins: [scrollToErrorsMixin],

  props: {
    carrier: {
      type: Object,
      required: true
    }
  },

  components: {
    "carrier-card-header": CarrierCardHeader
  },

  data() {
    return {
      kind: "no-foreigners",
      firstName: "",
      lastName: "",
      position: "",
      location: ""
    };
  },

  created() {
    this.setup();
  },

  async beforeRouteEnter(routeTo, routeFrom, next) {
    if (routeTo.params.carrier) {
      next();
    } else {
      next(
        await routeLoadCarrier(routeTo, routeFrom, response => {
          routeTo.params.carrier = response.carrier;
        })
      );
    }
  },

  watch: {
    carrier: function() {
      this.setup();
    }
  },

  methods: {
    setup() {
      this.errorMessage = null;
      this.fieldErrors = {};
    },

    async sign() {
      const payload = {
        kind: this.kind,
        first_name: this.firstName,
        last_name: this.lastName,
        position: this.position,
        location: this.location
      };
      const data = await api.signCarrierCertificate(
        this.carrier.siret,
        payload
      );
      if (data.errors) {
        this.setErrorsAndScrollTo(data.errors, this.$refs.mainContent);
      } else {
        // Success
        this.$store.commit("MESSAGE_ADD", {
          message: "L'attestation a été signée."
        });
        // Redirect
        this.$router.push({
          name: "carrier_detail",
          carrierSiret: this.carrier.siret
        });
      }
    }
  }
};
</script>
