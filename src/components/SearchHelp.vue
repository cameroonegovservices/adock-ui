<template lang="pug">
  v-card.elevation-0.adock-search-help
    v-layout.pt-4.adock-search-help(row wrap justify-space-around)
      v-flex(xs3)
        h2.text-xs-center
          v-icon(x-large) search
        h3.text-xs-center 1. Recherchez votre entreprise
        p.text-xs-center Grâce à son SIRET ou son nom
      v-flex(xs3)
        h2.text-xs-center
          v-icon(x-large) mode_edit
        h3.text-xs-center 2. Complétez votre fiche transporteur
        p.text-xs-center
          | Avec le téléphone ou le mail de votre commercial
          | et votre spécialité (par ex. transport frigorifique)
      v-flex(xs3)
        h2.text-xs-center
          v-icon(x-large) call
        h3.text-xs-center 3. Apparaissez en tête des recherches
        p.text-xs-center Grâce à votre profil complet !
</template>

<style lang="stylus">
.card.adock-search-help
  background-color: rgba(255, 255, 255, .7)

.layout.adock-seach-help
  h3, p, .icon
    color: #373C42
</style>
