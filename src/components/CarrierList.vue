<template lang="pug">
  div
    v-card.mt-1(v-if="searchResponseIsEmpty")
      v-card-text La recherche avec {{ searchParamsForDisplay }} n'a retourné aucun résultat.
    v-card.mt-1(v-if="carriers && carriers.length > 0")
      v-list(two-line)
        v-subheader(v-if="limit") Seuls les {{ carriers.length }} premiers transporteurs de la recherche {{ searchParamsForDisplay }} sont affichés.
        v-subheader(v-else) {{ carriers.length }} transporteur{{ carriers.length > 1 ? "s" : "" }} pour la recherche {{ searchParamsForDisplay }}
        template(v-for="(carrier, index) in carriers")
          v-divider(v-if="index !== 0", :key="'d-' + carrier.siret")
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
</template>

<style lang="stylus">
.adock-carrier-list-tile
  white-space: unset

.adock-carrier-list-details
  width: 17ex;
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "carrier-list",

  props: {
    searchResponseIsEmpty: {
      type: Boolean,
      required: true
    },
    searchParams: {
      type: Object,
      default: null
    },
    // Array or null
    carriers: {
      required: true
    },
    limit: {
      type: Number,
      default: 0
    }
  },

  computed: {
    searchParamsForDisplay() {
      const messages = [];

      if (this.searchParams === null) {
        return "";
      }

      if (this.searchParams.q !== "") {
        messages.push(`« ${this.searchParams.q} »`);
      }

      if (
        this.searchParams.licenseTypes &&
        this.searchParams.licenseTypes.length > 0
      ) {
        const licenseTypes = this.searchParams.licenseTypes.map(
          item => item.text
        );
        messages.push(`poids « ${licenseTypes.join(", ")} »`);
      }

      if (
        this.searchParams.departementFrom != null &&
        this.searchParams.departementFrom !== ""
      ) {
        messages.push(`enlèvement « ${this.searchParams.departementFrom} »`);
      }

      if (
        this.searchParams.departementTo != null &&
        this.searchParams.departementTo !== ""
      ) {
        messages.push(`livraison « ${this.searchParams.departementTo} »`);
      }

      if (
        this.searchParams.specialities &&
        this.searchParams.specialities.length > 0
      ) {
        const specialities = this.searchParams.specialities.map(
          item => item.text
        );
        messages.push(`spécialités « ${specialities.join(", ")} »`);
      }

      return messages.join(", ");
    },
    ...mapState(["choices"])
  }
};
</script>
