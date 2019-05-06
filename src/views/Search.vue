<template lang="pug">
  v-container.adock-search-background(fluid fill-height)
    v-layout(row justify-center)
      v-flex(xs12 sm11 md9 lg8 xl6)
        v-card.elevation-8
          v-card-text
            div.display-1.mt-4.hidden-xs-only Cherchez et contactez simplement l'un des {{ meta.carrier.localeCount || '50 000' }} transporteurs de marchandises en France
            div.display-1.mt-4.hidden-sm-and-up Cherchez parmi les transporteurs de marchandises en France
            v-alert(
              v-if="errorMessage"
              type="error"
              :value="true"
            ) {{ errorMessage }}
            v-container(fluid ma-0 pa-0 align-baseline grid-list-md)
              v-layout(row)
                v-flex(xs12)
                  v-text-field(
                    label="Nom, code postal ou SIRET de l'entreprise"
                    v-model.trim="searchForm.q"
                    hint="Vous pouvez séparer les différents critères par une virgule (ex. « TRANS, OUEST, 35 »)."
                    @keyup.enter="search"
                    data-cy="searchFormQ"
                  )
              v-layout(row wrap)
                v-flex(xs12 md4)
                  v-layout(row wrap)
                    v-flex(xs12)
                      p.subheading Licences
                    v-flex(xs12)
                      v-checkbox.ma-0(
                        label="< 3,5 tonnes (léger)"
                        v-model="searchForm.licenseLTI"
                      )
                      v-checkbox.ma-0(
                        label="> 3,5 tonnes (lourd)"
                        v-model="searchForm.licenseLC"
                      )
                v-flex(xs12 md8)
                  v-layout
                    v-flex(xs12)
                      v-select(
                        label="Spécialités"
                        v-model="searchForm.specialities"
                        :items="options.specialities"
                        chips
                        multiple
                        deletable-chips
                        return-object
                      )
                  v-layout
                    v-flex(xs12 md6)
                      v-autocomplete(
                        label="Département d'enlèvement"
                        v-model="searchForm.departementFrom"
                        :items="DEPARTEMENTS"
                        :item-text="departementItemText"
                        item-value="number"
                        @keyup.enter="search"
                        data-cy="searchFormDepartementFrom"
                        hint="Numéro ou nom du département, ex. 44 ou Loire-Atlantique"
                        clearable
                      )
                    v-flex(xs12 md6)
                      v-autocomplete(
                        label="Département de livraison"
                        v-model='searchForm.departementTo'
                        :items="DEPARTEMENTS"
                        :item-text="departementItemText"
                        item-value="number"
                        @keyup.enter="search"
                        hint="Numéro ou nom du département, ex. Ille et Vilaine ou 35"
                        clearable
                      )
              v-layout
                v-flex.adock-align-right
                  v-btn(@click.native="clear") Effacer
                  v-btn(large color="primary" @click.native="search") Chercher
        carrier-list(
          :searchParams="searchParams"
          :searchResponseIsEmpty="searchResponseIsEmpty"
          :carriers="carriers"
          :limit="limit"
        )
        search-help
        testimonial-cards
</template>

<script>
import deepClone from "lodash.clonedeep";
import { mapState } from "vuex";

import api from "@/api";
import CarrierList from "@/components/CarrierList.vue";
import TestimonialCards from "@/components/TestimonialCards.vue";
import SearchHelp from "@/components/SearchHelp.vue";
import { DEPARTEMENTS } from "@/departements";

const defaultSearchForm = {
  q: "",
  withLicenseLTI: false,
  withLicenseLC: false,
  departementFrom: "",
  departementTo: "",
  specialities: []
};

export default {
  name: "search",

  props: {
    keepPreviousSearch: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isSearching: false,
      searchForm: deepClone(defaultSearchForm),
      searchParams: null,
      carriers: null,
      limit: 0,
      errorMessage: null
    };
  },

  created() {
    this.DEPARTEMENTS = DEPARTEMENTS;
  },

  components: {
    "testimonial-cards": TestimonialCards,
    "carrier-list": CarrierList,
    "search-help": SearchHelp
  },

  computed: {
    searchResponseIsEmpty() {
      return (
        !this.isSearching && this.carriers != null && this.carriers.length === 0
      );
    },
    ...mapState(["meta", "options"])
  },

  methods: {
    departementItemText(item) {
      return `${item.number} - ${item.name}`;
    },

    async search() {
      // Remove error message as soon as the user clicks.
      this.errorMessage = null;
      this.isSearching = true;
      const params = {};

      // The parameters of the query are in French.
      // Only add not empty criteria.
      if (this.searchForm.q) {
        params["q"] = this.searchForm.q;
      }

      params["licence-types"] = [];
      if (this.searchForm.licenseLTI) {
        params["licence-types"].push("lti");
      }

      if (this.searchForm.licenseLC) {
        params["licence-types"].push("lc");
      }

      if (this.searchForm.departementFrom) {
        params["departement-depart"] = this.searchForm.departementFrom;
      }

      if (this.searchForm.departementTo) {
        params["departement-arrivee"] = this.searchForm.departementTo;
      }

      params["specialities"] = this.searchForm.specialities.map(
        item => item.value
      );

      const response = await api.get(api.searchCarriersUrl, params);
      if (response.status === 200) {
        // Disable reactivity to speed up rendering
        this.carriers = Object.freeze(response.data.carriers);
        this.limit = response.data.limit || 0;
        // Build an object with search parameters to display them to the user with the results
        this.searchParams = JSON.parse(JSON.stringify(this.searchForm));
      } else {
        if (response.data.message) {
          this.errorMessage = response.data.message;
        }
        this.carriers = null;
        this.limit = 0;
      }

      this.isSearching = false;
    },

    clear() {
      this.searchForm = deepClone(defaultSearchForm);
      this.carriers = null;
    }
  }
};
</script>
