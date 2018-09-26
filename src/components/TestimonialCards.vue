<template lang="pug">
  v-container(
    d-flex
    grid-list-md
    px-0
  )
    v-layout(row wrap)
      v-flex(v-for="testimonial in testimonials" :key="testimonial.text" md4 xs12)
        v-card(height="100%")
          v-card-text
            h3.headline.text-xs-center.adock-testimonial-title {{ testimonial.title }}
          v-flex(xs10 offset-xs1)
            v-divider(light)
          v-card-text
            blockquote.blockquote
              v-icon format_quote
              | {{ testimonial.quote }}
</template>

<style lang="stylus">
.adock-testimonial-title
  padding-top: 24px
  padding-bottom: 0
</style>

<script>
export default {
  name: 'Testimonial',

  data () {
    return {
      testimonials: [
        {
          title: 'Interloc TP',
          quote: `C'est vraiment encourageant pour la profession de voir que l'État
            met en place des aides au développement de notre activité.`
        },
        {
          title: 'STEP',
          quote: `En tant que petite sociéte de transport naissante, cet outil peut être très
            utile pour se faire connaître.`
        },
        {
          title: 'Les Routiers Bretons',
          quote: `Facile à utiliser et saisie rapide à faire.`
        }
      ]
    }
  }
}
</script>
