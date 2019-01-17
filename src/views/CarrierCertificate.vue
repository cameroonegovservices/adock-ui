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
          v-form(autocomplete="nope")
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
                    :error-messages="fieldErrors.kind"
                  )
                    v-radio(
                      label="Attestation de non emploi de travailleurs étrangers"
                      value="no-workers"
                    )
                    v-radio(
                      label="Attestation d'emploi de travailleurs étrangers"
                      value="workers"
                    )
              v-layout(v-if="kind === 'workers'")
                v-flex(xs12 offset-md1 md10)
                  p.subheading.mb-0 Salariés étrangers
              v-layout(
                wrap
                v-if="kind === 'workers'"
                v-for="(worker, index) in workers"
                :key="worker.id"
              )
                v-flex(xs2 md1 align-self-center)
                  v-chip(outline) {{ index + 1 }}
                v-flex(xs6 md3)
                  v-text-field(
                    browser-autocomplete="off"
                    v-model="worker.name"
                    label="Nom"
                    hint="Nom et prénom du salarié"
                    :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].name"
                    required
                  )
                v-flex(xs4 md2)
                  v-text-field(
                    browser-autocomplete="off"
                    v-model="worker.date"
                    label="Date"
                    hint="Date d'embauche"
                    required
                    :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].date"
                  )
                v-flex(offset-xs2 xs4 offset-md0 md2)
                  v-text-field(
                    browser-autocomplete="off"
                    v-model="worker.nationality"
                    label="Nationalité"
                    required
                    :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].nationality"
                  )
                v-flex(xs4 md3)
                  v-text-field(
                    browser-autocomplete="off"
                    v-model="worker.work_permit"
                    label="N° d'autorisation"
                    hint="Type / N°ordre titre valant autorisation de travail"
                    required
                    :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].work_permit"
                  )
                v-flex(xs1 md1 align-self-center)
                  v-btn(flat icon color="grey" @click="removeWorker(worker)")
                    v-icon delete
              v-layout(
                v-if="kind === 'workers'"
              )
                v-flex(xs3 offset-md1 md2)
                  v-btn(@click="addWorker") Ajouter
                v-flex(
                  v-if="workerIsEmptyError && workerIsEmpty"
                  xs9 md7
                )
                  v-alert(
                    :value="true"
                    type="error"
                    icon="warning"
                    outline
                  ) Vous devez au préalable remplir les champs existants
              v-layout
                v-flex(xs12 offset-md1 md10)
                  p.subheading Responsable de l'entreprise
                  v-text-field(
                    v-model="lastName"
                    label="Nom"
                    required
                    :error-messages="fieldErrors.last_name"
                  )
                  v-text-field(
                    v-model="firstName"
                    label="Prénom"
                    required
                    :error-messages="fieldErrors.first_name"
                  )
                  v-text-field(
                    v-model="position"
                    label="Fonction"
                    required
                    :error-messages="fieldErrors.position"
                  )
                  v-text-field(
                    v-model="location"
                    label="Lieu"
                    required
                    :error-messages="fieldErrors.location"
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

const EMPTY_WORKER = {
  name: "",
  date: "",
  nationality: "",
  work_permit: ""
};

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
      kind: null,
      firstName: "",
      lastName: "",
      position: "",
      location: "",
      workers: null,
      workerIsEmptyError: false
    };
  },

  created() {
    this.workerSequenceId = 1;
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

  computed: {
    workerIsEmpty() {
      return this.workers.some(
        worker =>
          worker.name === "" ||
          worker.date === "" ||
          worker.nationality === "" ||
          worker.work_permit === ""
      );
    }
  },

  methods: {
    setup() {
      this.errorMessage = null;
      this.fieldErrors = {};
      // Only keep manager informations (if any)
      this.kind = "workers";
      this.workers = [this.newWorker()];
    },

    newWorker() {
      return Object.assign(
        {
          id: this.workerSequenceId++
        },
        EMPTY_WORKER
      );
    },

    addWorker() {
      // Only update on click
      this.workerIsEmptyError = this.workerIsEmpty;
      if (this.workerIsEmptyError) {
        return;
      }
      const newWorker = this.newWorker();
      this.workers.push(newWorker);
    },

    removeWorker(worker) {
      this.workers.splice(this.workers.indexOf(worker), 1);
    },

    async sign() {
      const payload = {
        kind: this.kind,
        first_name: this.firstName,
        last_name: this.lastName,
        position: this.position,
        location: this.location
      };
      if (this.kind === "workers") {
        payload.workers = this.workers;
      }

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
