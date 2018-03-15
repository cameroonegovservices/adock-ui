<template lang="pug">
  v-card(color="grey lighten-4")
    v-card-title(primay-title)
      div
        div(class="headline") {{ company.raison_sociale }}
        span {{ company.adresse }}
        br
        span {{ company.code_postal }} {{ company.vile }}
        br
        span {{ company.code_ape }}
        br
        span {{ company.libelle_ape }}
    v-card-actions
      v-btn(flat, color="primary", @click="onSelectCompany") Sélectionner
</template>

<script>
export default {
  name: 'CompanyCard',
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSelectCompany () {
      this.$emit('select', this.company)
    }
  }
}
</script>
