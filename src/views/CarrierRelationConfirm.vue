<template lang="pug">
v-container(fluid fill-height)
  v-layout(row justify-center align-center)
    v-flex(xs6 text-xs-center)
      div(v-if="waiting")
        h4 {{ relation.title }}
        br
        v-progress-circular(
          :indeterminate="true"
          color="primary"
        )
      template(v-else)
        div(v-if="status === 200")
          h3 {{ message }}
            v-icon(color="success") done
          p
            |
            | {{ relation.preContent }}
            |
            router-link(:to="{name: 'carrier_detail', params: {carrierSiret: this.carrierSiret}}") {{ carrierSiret }}
            |
            | {{ relation.postContent }}
        div(v-else)
          h3 {{ message }}
          p(v-if="status === 400") Le jeton a peut être expiré ou a déjà été utilisé.
</template>

<script>
import api from "@/api";

const EDITABLE = "changement";
const CERTIFICATE = "attestation";

const RELATIONS = {
  [EDITABLE]: {
    title:
      "Confirmation des modifications de la fiche transporteur en cours...",
    preContent: "Les modifications de la fiche transporteur",
    postContent: "ont été appliquées.",
    getUrl(relationId, token) {
      return api.getCarrierEditableConfirmUrl(relationId, token);
    }
  },
  [CERTIFICATE]: {
    title:
      "Confirmation de la nouvelle attestation de la fiche transporteur en cours...",
    preContent: "L'attestation de la fiche transporteur",
    postContent: "a été confirmée.",
    getUrl(relationId, token) {
      return api.getCarrierCertificateConfirmUrl(relationId, token);
    }
  }
};

export default {
  name: "carrier-relation-confirm",

  props: {
    frRelationType: {
      type: String,
      required: true,
      validator: function(value) {
        return ["changement", "attestation"].indexOf(value) !== -1;
      }
    },
    relationId: {
      type: String,
      required: false
    },
    token: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      message: "",
      status: null,
      waiting: true,
      carrierSiret: null
    };
  },

  async mounted() {
    const url = this.relation.getUrl(this.relationId, this.token);
    const response = await api.get(url);
    this.carrierSiret = (response.data && response.data.siret) || null;
    this.message = (response.data && response.data.message) || "";
    this.status = response.status;
    this.waiting = false;
  },

  computed: {
    relation() {
      return RELATIONS[this.frRelationType];
    }
  }
};
</script>
