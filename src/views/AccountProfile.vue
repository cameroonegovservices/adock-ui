<template lang="pug">
  v-container(fluid)
    v-layout(justify-center row wrap)
      v-flex(xs12 sm11 md9 lg8 xl6)
        v-alert(
              type="error"
              :value="!!errorMessage"
            ) {{ errorMessage }}
        v-card
          v-card-title(primary-title)
            div
              h1(headline mb-0) {{ displayUser }}
              p {{ user ? user.email : "" }}
          v-card-text
            p Compte « {{ providerDisplay }} » créé le {{ localeDateJoined }}
            p Dernière connexion le {{ localeLastLogin }}
            p
              | La dernière version des
              |
              router-link(:to="{name: 'cgu'}") CGU
              |
              | a été accepté : {{ user.has_accepted_cgu ? "oui" : "non" }}
            v-alert(
              type="warning"
              :value="true"
            )
              | Vous devez accepter les dernières
              |
              router-link(:to="{name: 'cgu'}") Conditions Générales d'Utilisation
              |
              | pour utiliser le service
        v-card.mt-1
          v-card-title(primary-title)
            h2(headline) Vos entreprises
          v-list(two-line v-if="carriers && carriers.length > 0")
            template(v-for="(carrier, index) in carriers")
              v-divider
              v-list-tile(
                :key="carrier.siret",
                :to="{ name: 'carrier_detail', params: { carrierSiret: carrier.siret }}")
                v-list-tile-content
                  v-list-tile-title.adock-carrier-list-tile {{ carrier.enseigne }}
                  v-list-tile-sub-title.adock-carrier-list-tile
                    | {{ carrier.code_postal }} {{ carrier.ville }}
                v-list-tile-action
                  v-list-tile-action-text.adock-carrier-list-details
                    span  &lt; 3,5 tonnes&nbsp;: {{ carrier.lti_nombre }}
                    br
                    span &gt; 3,5 tonnes&nbsp;: {{ carrier.lc_nombre }}
                    br
                    span {{ choices.workingAreas[carrier.working_area] }}
          v-card-text(v-else) Aucune entreprise associée à ce compte.


</template>

<script>
import { mapState } from "vuex";

import api from "@/api";
import { displayUserMixin, resetOnShowMixin } from "@/mixins";

export default {
  name: "account-profile",
  componentUrl: "account_profile",

  mixins: [displayUserMixin, resetOnShowMixin],

  computed: {
    ...mapState(["choices"])
  },

  methods: {
    getDefaultData() {
      return {
        localeDateJoined: null,
        localeLastLogin: null,
        providerDisplay: "",
        hasAcceptedCGU: true,
        errorMessage: "",
        carriers: null
      };
    },

    async setup() {
      Object.assign(this.$data, this.getDefaultData());
      const response = await api.get(api.profileUrl);
      if (response.status === 200) {
        const user = response.data.user;
        this.localeDateJoined = new Date(user.date_joined).toLocaleDateString();
        this.localeLastLogin = user.last_login
          ? new Date(user.last_login).toLocaleDateString()
          : new Date().toLocaleDateString();
        this.providerDisplay = user.provider_display;
        this.hasAcceptedCGU = user.has_accepted_cgu;
        this.carriers = user.carriers;
      } else {
        this.errorMessage = response.data.message;
      }
    }
  }
};
</script>
