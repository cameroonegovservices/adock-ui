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
                v-text-field(
                  label="Téléphone"
                  v-model="form.phone"
                  input="phone"
                  :error-messages="fieldErrors.telephone"
                  data-cy="inputPhone"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  label="Adresse électronique"
                  v-model="form.email"
                  input="email"
                  :error-messages="fieldErrors.email"
                  data-cy="inputEmail"
                  placeholder="contact@transporteur.fr"
                  hint="Cette adresse de contact sera aussi utilisée pour verrouiller la fiche transporteur."
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  label="Site Web"
                  v-model="form.website"
                  input="url"
                  :error-messages="fieldErrors.website"
                  placeholder="https://www.transporteur.fr"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-select(
                  label="Aire de travail"
                  v-model="form.workingArea"
                  :items="options.workingAreas"
                  data-cy="inputWorkingArea"
                  :error-messages="fieldErrors.working_area"
                )
            v-layout(v-if="form.workingArea === 'REGION'")
              v-flex(xs12 offset-md1 md10)
                v-autocomplete(
                  label="Ajout de tous les départements d'une région"
                  v-model="form.region"
                  hint="Cliquez sur « Ajouter » pour ajouter tous les départements de cette région aux départements livrés."
                  :items="workingAreaRegions"
                  :persistent-hint="true"
                )
                  v-btn(
                    slot="append-outer"
                    small
                    @click="addDepartementsFromRegion"
                  ) Ajouter
            v-layout(v-if="['DEPARTEMENT', 'REGION'].includes(form.workingArea)")
              v-flex(xs12 offset-md1 md10)
                v-text-field(
                  label="Départements livrés"
                  v-model="workingAreaDepartementsInput"
                  :error-messages="fieldErrors.working_area_departements"
                  hint="Numéros des départements séparés par des espaces ou des virgules"
                  :rules="[workingAreaDepartementsRule]"
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-select(
                  label="Spécialités"
                  v-model="form.specialities"
                  :items="options.specialities"
                  :error-messages="fieldErrors.specialities"
                  chips
                  multiple
                  deletable-chips
                )
            v-layout
              v-flex(xs12 offset-md1 md10)
                v-textarea(
                  label="Description de l'activité"
                  v-model="form.description"
                  :rows="3"
                  :error-messages="fieldErrors.description"
                )
            v-layout(wrap)
              v-flex.adock-align-right(xs12 offset-md6 md5)
                v-btn(:to="{name: 'carrier_detail', params: { carrierSiret: carrier.siret }}") Annuler
                v-btn(color="primary" @click.native="post") Suivant
</template>

<style lang="stylus">
.flex.flex-bottom
  flex-basis: 0

.adock-legal-text .v-label
  font-size: 14px
</style>

<script>
import { mapState } from "vuex";

import { routeLoadCarrier } from "@/routeLoaders";
import CarrierCardHeader from "@/components/CarrierCardHeader";

import api from "@/api";
import { scrollToErrorsMixin } from "@/mixins";

function sortUniq(a) {
  return a.sort().filter((item, pos, array) => !pos || item !== array[pos - 1]);
}

function joinDepartements(departements) {
  return departements.join(", ");
}

function splitDepartements(departementsString) {
  const departements = [];
  const commaDepartements = departementsString.split(",");
  commaDepartements.forEach(commaDepartement => {
    const departementsTmp = commaDepartement.split(" ");
    departements.push(
      ...departementsTmp.filter(departement => departement !== "")
    );
  });
  return departements;
}

const WORKING_AREA_REGIONS = {
  "Auvergne-Rhône-Alpes": [
    "01",
    "03",
    "07",
    "15",
    "26",
    "38",
    "42",
    "43",
    "63",
    "69",
    "73",
    "74"
  ],
  "Bourgogne-France-Comté": ["21", "25", "39", "58", "70", "71", "89", "90"],
  Bretagne: ["22", "29", "35", "56"],
  "Centre-Val de Loire": ["18", "28", "36", "37", "41", "45"],
  Corse: ["2A", "2B"],
  "Grand Est": ["08", "10", "51", "52", "54", "55", "57", "67", "68", "88"],
  "Hauts-de-France": ["02", "59", "60", "62", "80"],
  "Île-de-France": ["75", "77", "78", "91", "92", "93", "94", "95"],
  Normandie: ["14", "27", "50", "61", "76"],
  "Nouvelle-Aquitaine": [
    "16",
    "17",
    "19",
    "23",
    "24",
    "33",
    "40",
    "47",
    "64",
    "79",
    "86",
    "87"
  ],
  Occitanie: [
    "09",
    "11",
    "12",
    "30",
    "31",
    "32",
    "34",
    "46",
    "48",
    "65",
    "66",
    "81",
    "82"
  ],
  "Pays de la Loire": ["44", "49", "53", "72", "85"],
  "Provence-Alpes-Côte d'Azur": ["04", "05", "06", "13", "83", "84"],
  Guadeloupe: ["971"],
  Martinique: ["972"],
  Guyane: ["973"],
  "La Réunion": ["974"],
  Mayotte: ["976"]
};

export default {
  name: "carrier-edit",

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
      form: {
        email: "",
        phone: "",
        workingArea: "",
        workingAreaDepartements: [],
        region: "",
        specialities: [],
        website: "",
        description: ""
      }
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
        await routeLoadCarrier(routeTo, routeFrom, data => {
          routeTo.params.carrier = data.carrier;
        })
      );
    }
  },

  watch: {
    carrier: function() {
      this.setup();
    }
  },

  computed: {
    workingAreaRegions() {
      // Returns the list of regions names
      return Object.keys(WORKING_AREA_REGIONS);
    },
    workingAreaDepartementsInput: {
      get: function() {
        return joinDepartements(this.form.workingAreaDepartements);
      },
      set: function(newValue) {
        this.form.workingAreaDepartements = splitDepartements(newValue);
      }
    },
    ...mapState(["options"])
  },

  methods: {
    async setup() {
      this.errorMessage = null;
      this.fieldErrors = {};
      this.loadForm(this.carrier);
    },

    loadForm(carrier) {
      if (carrier == null || typeof carrier !== "object") {
        return;
      }

      // Populate the form fields with the carrier data
      this.form.email = carrier.email || "";
      this.form.phone = carrier.telephone || "";
      this.form.workingArea = carrier.working_area || "";
      const counties = carrier.working_area_departements;
      this.form.workingAreaDepartements = counties != null ? counties : [];
      this.form.specialities = carrier.specialities || [];
      this.form.website = carrier.website || "";
      this.form.description = carrier.description || "";
    },

    getPayloadFromForm() {
      return {
        email: this.form.email,
        telephone: this.form.phone,
        working_area: this.form.workingArea,
        working_area_departements: this.form.workingAreaDepartements,
        specialities: this.form.specialities,
        website: this.form.website,
        description: this.form.description
      };
    },

    async post() {
      const payload = this.getPayloadFromForm();
      const response = await api.post(
        api.getCarrierUrl(this.carrier.siret),
        payload
      );
      if (response.status === 200) {
        // Success
        if (response.data.confirmation_sent_to) {
          this.$store.commit("MESSAGE_ADD", {
            message: `Un courriel a été envoyé à « ${
              response.data.confirmation_sent_to
            } » pour confirmer les modifications.`
          });
        }

        // Redirect
        this.$router.push({
          name: "carrier_certificate",
          carrierSiret: this.carrier.siret
        });
      } else {
        this.setErrorsAndScrollTo(response.data, this.$refs.mainContent);
      }
    },

    addDepartementsFromRegion() {
      if (WORKING_AREA_REGIONS.hasOwnProperty(this.form.region)) {
        this.form.workingAreaDepartements.push(
          ...WORKING_AREA_REGIONS[this.form.region]
        );
      }
      this.form.workingAreaDepartements = sortUniq(
        this.form.workingAreaDepartements
      );
      this.form.region = "";
    },

    workingAreaDepartementsRule(value) {
      if (["DEPARTEMENT", "REGION"].includes(this.form.workingArea) && !value) {
        return "Des départements doivent être renseignés quand l'aire de travail est départementale ou régionale.";
      } else {
        return true;
      }
    }
  }
};
</script>
