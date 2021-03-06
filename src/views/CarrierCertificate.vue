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
                      v-for="certificate in options.certificates"
                      :key="certificate.value"
                      :label="certificate.text"
                      :value="certificate.value"
                    )
              template(
                v-if="isCertificateWithworkers"
              )
                v-layout
                  v-flex(xs12 offset-md1 md10)
                    p.subheading.mb-0 Salariés étrangers
                v-layout(
                  wrap
                  v-for="(worker, index) in workers"
                  :key="worker.id"
                )
                  v-flex(xs2 md1 align-self-center)
                    v-chip(outline) {{ index + 1 }}
                  v-flex(xs6 md3)
                    v-text-field(
                      label="Nom et prénom"
                      v-model="worker.name"
                      browser-autocomplete="off"
                      hint="Nom et prénom du salarié"
                      :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].name"
                    )
                  v-flex(xs4 md2)
                    v-text-field(
                      label="Date"
                      v-model="worker.date"
                      browser-autocomplete="off"
                      hint="Date d'embauche"
                      :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].date"
                    )
                  v-flex(offset-xs2 xs4 offset-md0 md2)
                    v-text-field(
                      label="Nationalité"
                      v-model="worker.nationality"
                      browser-autocomplete="off"
                      :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].nationality"
                    )
                  v-flex(xs4 md3)
                    v-text-field(
                      label="N° d'autorisation"
                      v-model="worker.work_permit"
                      browser-autocomplete="off"
                      hint="Titre / n° d'ordre du titre valant autorisation de travail"
                      :error-messages="fieldErrors.workers && fieldErrors.workers[index] && fieldErrors.workers[index].work_permit"
                    )
                  v-flex(xs1 md1 align-self-center)
                    v-btn(flat icon color="grey" @click="removeWorker(worker)")
                      v-icon delete
                v-layout
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
                    label="Prénom"
                    v-model="firstName"
                    :error-messages="fieldErrors.first_name"
                    data-cy="inputFirstName"
                  )
                  v-text-field(
                    label="Nom"
                    v-model="lastName"
                    :error-messages="fieldErrors.last_name"
                    data-cy="inputLastName"
                  )
                  v-text-field(
                    label="Fonction"
                    v-model="position"
                    :error-messages="fieldErrors.position"
                    data-cy="inputPosition"
                  )
                  v-text-field(
                    label="Lieu"
                    v-model="location"
                    :error-messages="fieldErrors.location"
                    data-cy="inputLocation"
                  )
              v-layout(wrap)
                v-flex.adock-align-right(xs12 md11)
                  v-btn(:to="{name: 'carrier_detail', params: { carrierSiret: carrier.siret }}") Annuler
                  v-btn(
                    color="primary"
                    @click.native="sign"
                  ) Générer
</template>

<script>
import { mapState } from "vuex";

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
    return this.getDefaultData();
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
    isCertificateWithworkers() {
      return this.kind === "WORKERS";
    },

    workerIsEmpty() {
      return this.workers.some(
        worker =>
          worker.name === "" ||
          worker.date === "" ||
          worker.nationality === "" ||
          worker.work_permit === ""
      );
    },
    ...mapState(["options"])
  },

  methods: {
    getDefaultData() {
      const user = this.$store.state.user;
      return {
        kind: "NO_WORKERS",
        firstName: user && user.first_name,
        lastName: user && user.last_name,
        position: "",
        location: "",
        workers: [this.newWorker()],
        workerIsEmptyError: false
      };
    },

    setup() {
      // For mixin
      this.errorMessage = null;
      this.fieldErrors = {};
      // For self
      Object.assign(this.$data, this.getDefaultData());
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
      if (this.isCertificateWithworkers) {
        payload.workers = this.workers;
      }

      const url = api.getCarrierCertificateUrl(this.carrier.siret);
      const response = await api.post(url, payload);
      if (response.status === 200) {
        // Success
        this.$store.commit("MESSAGE_ADD", {
          message: `Un courriel a été envoyé à « ${
            response.data.carrier.email
          } » pour confirmer l'attestation.`
        });
        // Redirect
        this.$router.push({
          name: "carrier_detail",
          carrierSiret: this.carrier.siret
        });
      } else {
        this.setErrorsAndScrollTo(response.data, this.$refs.mainContent);
      }
    }
  }
};
</script>
