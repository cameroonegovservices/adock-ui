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
                    v-model.trim="searchForm.q"
                    label="Nom, code postal ou SIRET de l'entreprise"
                    hint="Vous pouvez séparer les différents critères par une virgule (ex. « TRANS, OUEST, 35 »)."
                    @keyup.enter="search"
                    data-cy="searchFormQ"
                  )
              v-layout(row wrap)
                v-flex(xs12 sm4 md5)
                  v-select(
                    :items="searchLicenseTypeChoices"
                    v-model="searchForm.licenseTypes"
                    label="Tonnage"
                    hint="Le transporteur doit disposer d'au moins une licence pour le critère."
                    chips
                    multiple
                    return-object
                  )
                    template(
                      slot="selection"
                      slot-scope="data"
                    )
                      v-chip.chip--select--multi(
                        @input="data.parent.selectItem(data.item)"
                        :selected="data.selected"
                        :disabled="data.disabled"
                        :key="JSON.stringify(data.item)"
                        close
                      )
                        v-avatar.accent {{ data.item.avatar }}
                        .
                          {{ data.item.text }}
                v-flex(xs12 sm8 md7)
                  v-select(
                    :items="options.specialities"
                    v-model="searchForm.specialities"
                    label="Spécialités"
                    chips
                    multiple
                    deletable-chips
                    return-object
                  )
              v-layout(row wrap)
                v-flex(xs12 sm6 md4)
                  v-autocomplete(
                    v-model="searchForm.departementFrom"
                    label="Département d'enlèvement"
                    :items="DEPARTEMENTS"
                    :item-text="departementItemText"
                    item-value="number"
                    @keyup.enter="search"
                    data-cy="searchFormDepartementFrom"
                    hint="Numéro ou nom du département, ex. 44 ou Loire-Atlantique"
                    clearable
                  )
                v-flex(xs12 sm6 md4)
                  v-autocomplete(
                    v-model='searchForm.departementTo'
                    label="Département de livraison"
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

<style lang="stylus">
.adock-search-background
  background: no-repeat top/100% url('../assets/search-background.jpg')
  background-color: white
</style>

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
  licenseTypes: [],
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
    this.searchLicenseTypeChoices = [
      {
        text: "Léger (< 3,5 t)",
        value: "lti",
        avatar: "LTI"
      },
      {
        text: "Lourd (> 3,5 t)",
        value: "lc",
        avatar: "LC"
      }
    ];
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

      if (this.searchForm.licenseTypes) {
        params["licence-types"] = this.searchForm.licenseTypes.map(
          item => item.value
        );
      }

      if (this.searchForm.departementFrom) {
        params["departement-depart"] = this.searchForm.departementFrom;
      }

      if (this.searchForm.departementTo) {
        params["departement-arrivee"] = this.searchForm.departementTo;
      }

      if (this.searchForm.specialities) {
        params["specialities"] = this.searchForm.specialities.map(
          item => item.value
        );
      }

      const data = await api.searchCarriers({ params });
      if (data.error == null) {
        // Disable reactivity to speed up rendering
        this.carriers = Object.freeze(data.carriers);
        this.limit = data.limit;
        // Build an object with search parameters to display them to the user with the results
        this.searchParams = JSON.parse(JSON.stringify(this.searchForm));
      } else {
        if (data.error.message) {
          this.errorMessage = data.error.message;
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
