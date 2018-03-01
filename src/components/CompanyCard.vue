<template lang="pug">
  v-card(color="grey lighten-4")
    v-card-title(primay-title)
      div
        div(class="headline") {{ company.line1 }}
        span {{ company.address }}
        br
        span {{ company.zipCode }} {{ company.city }}
        br
        span {{ company.codeApe }}
        br
        span {{ company.textApe }}
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
      this.$emit('select', {'siret': this.company.siret})
    }
  }
}
</script>
