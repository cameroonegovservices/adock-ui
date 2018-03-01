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
          v-stepper-step(step="2", :complete="step > 2") Sélection de l'établissement
          v-stepper-content(step="2")
            v-progress-circular(v-if="isSearching", indeterminate, color="primary")
            v-container(v-else, fluid, grid-list-lg)
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
import CompanyCard from '@/components/CompanyCard.vue'

export default {
  data () {
    return {
      siren: null,
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
    searchSiren () {
      this.isSearching = true
      this.step = 2

      const rawCompanies = [
        {
          siren: '824808349',
          nic: '00016',
          l1_normalisee: 'MADAME CLOTILDE TESSIER',
          l6_normalisee: '75008 PARIS',
          numvoie: '9',
          typevoie: 'RTE',
          libvoie: 'DE ROCHEFORT',
          codpos: '75008',
          dcret: '20170106',
          apet700: '4779Z',
          libapet: "Commerce de détail de biens d'occasion en magasin"
        },
        {
          siren: '824808349',
          nic: '00017',
          l1_normalisee: 'MADAME BRIGITTE TESSIER',
          l6_normalisee: '75008 PARIS',
          numvoie: '9',
          typevoie: 'RTE',
          libvoie: 'DE ROCHEFORT',
          codpos: '75008',
          dcret: '20170106',
          apet700: '4779Z',
          libapet: "Commerce de détail de biens d'occasion en magasin"
        },
        {
          siren: '824808349',
          nic: '00018',
          l1_normalisee: 'MONSIEUR MARC BOULLAIS',
          l6_normalisee: '75008 PARIS',
          numvoie: '9',
          typevoie: 'RTE',
          libvoie: 'DE ROCHEFORT',
          codpos: '75008',
          dcret: '20170106',
          apet700: '4779Z',
          libapet: "Commerce de détail de biens d'occasion en magasin"
        }
      ]
      this.companies = []
      for (let rawCompany of rawCompanies) {
        rawCompany.l6_normalisee = rawCompany.l6_normalisee || ''
        this.companies.push({
          siret: rawCompany.siren + rawCompany.nic,
          name: rawCompany.l1_normalisee,
          address: `${rawCompany.numvoie} ${rawCompany.typevoie} ${rawCompany.libvoie}`,
          zipCode: rawCompany.codpos,
          city: rawCompany.l6_normalisee.replace(rawCompany.codpos + ' ', ''),
          codeApe: rawCompany.apet700,
          textApe: rawCompany.libapet
        })
      }
      this.isSearching = false
    },

    selectCompany (data) {
      this.selectedCompany = data
      this.step = 3
    },

    subscribe () {

    }
  }
}
</script>
