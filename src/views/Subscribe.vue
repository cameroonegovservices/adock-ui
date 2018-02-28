<template lang="pug">
  v-container(grid-list-md)
    v-layout
      v-flex(xs12)
        h1 Inscription au service
        v-stepper(v-model="step", vertical)
          v-stepper-step(step="1", :complete="step > 1") Saisie du numéro de SIREN
            small Recherche de l'établissement concerné
          v-stepper-content(step="1")
            v-container(fluid)
              v-layout
                v-flex(xs12, md6)
                  v-text-field(v-model="siren", label="Numéro de SIREN ou SIRET")
                  v-btn(color="primary" @click.native="searchSiren") Suivant
                  v-btn(flat) Annuler
          v-stepper-step(step="2", :complete="step > 2") Sélection de l'établissement
          v-stepper-content(step="2")
            v-progress-circular(v-if="isSearching", indeterminate, color="primary")
            v-btn(color="primary" @click.native="step = 3") Suivant
            v-btn(flat)
          v-stepper-step(step="3", :complete="step > 3") Mise à jour de vos coordonnées
          v-stepper-content(step="3")
            v-card(class="mb-5")
            v-btn(color="primary" @click.native="step = 4") Suivant
            v-btn(flat)
</template>

<script>
export default {
  data () {
    return {
      siren: null,
      step: 1,
      isSearching: false
    }
  },

  methods: {
    searchSiren () {
      this.isSearching = true
      this.step = 2
      // this.searching = false
    }
  }
}
</script>
