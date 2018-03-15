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
                  span(v-if="error") {{ error }}
                  v-text-field(v-model="searchQuery", label="Numéro de SIREN, SIRET ou nom de l'entreprise",
                    hint="Vous pouvez utiliser un SIRET (9 chiffres), un SIRET (15 chiffres) ou le nom partiel de l'entreprise.")
                  v-btn(color="primary" @click.native="search") Suivant
          v-stepper-step(step="2", :complete="step > 2") Sélection de l'établissement
          v-stepper-content(step="2")
            v-container(fluid, grid-list-lg)
              v-layout(row, wrap)
                v-flex(xs12, sd6, md4, v-for="company in companies", :key="company.siret")
                  company-card(:company="company", @select="selectCompany")
          v-stepper-step(step="3", :complete="step > 3") Mise à jour de vos coordonnées
          v-stepper-content(step="3")
            div(v-if="step === 3")
              span(color="grey") {{ this.selectedCompany.name }}
              v-text-field(input="email", v-model="email", label="Adresse électronique")
              v-text-field(input="phone", v-model="phone", label="Téléphone")
              v-btn(color="primary" @click.native="subscribe") S'inscrire
</template>

<script>
import axios from '@/resource'
import CompanyCard from '@/components/CompanyCard.vue'

export default {
  data () {
    return {
      error: null,
      searchQuery: null,
      step: 1,
      isSearching: false,
      companies: [],
      selectedCompany: null,
      email: null,
      phone: null
    }
  },

  components: {
    'company-card': CompanyCard
  },

  methods: {
    search () {
      this.error = null
      this.isSearching = true
      this.step = 2

      axios.get('/transporteurs/recherche/', {
        params: {
          q: this.searchQuery
        }
      }).then(response => {
        this.companies = response.data.results
        this.isSearching = false
      }).catch(() => {
        this.error = 'Requête non valide'
        this.isSearching = false
        // Back to step 1
        this.step = 1
      })
    },

    selectCompany (company) {
      console.log(company)
      this.selectedCompany = company
      this.step = 3
    },

    subscribe () {
      axios.post('/transporteurs/inscription/', {
        siret: this.selectedCompany.siret,
        email: this.email,
        phone: this.phone
      }).then(response => {
        console.log('Done')
      }).catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
        }
      })
    }
  }
}
</script>
