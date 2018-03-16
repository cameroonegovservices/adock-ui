<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs6)
        router-link(:to="{name: 'search'}").d-inline-flex.align-center.no-link
          v-btn(icon)
            v-icon chevron_left
          span.subheading.no-wrap Recherche
        v-card
          v-card-media.white--text(:src='roadPicture', height='200px')
            v-container(fill-height, fluid)
              v-layout(fill-height)
                v-flex(xs12, align-end, flexbox)
                  span.headline Transporteur
          v-card-title(primary-title)
            v-flex(xs12)
              h3.headline {{ transporteur.raison_sociale }}
              span.grey--text {{ transporteur.libelle_ape }}
          v-container(grid-list-lg, offset-xs1)
            v-layout(row, wrap)
              v-flex(xs5) SIRET
              v-flex.align-right(xs6) {{ transporteur.siret }}
            v-layout(row, wrap)
              v-flex(xs5) N° TVA
              v-flex.align-right(xs6) {{ transporteur.vat_number }}
            v-layout(row, wrap)
              v-flex(xs5) Adresse
              v-flex.align-right(xs6) {{ transporteur.adresse }}
            v-layout(row, wrap)
              v-flex(xs5) Ville
              v-flex.align-right(xs6) {{ transporteur.ville }}
            v-layout(row, wrap)
              v-flex(xs5) Licences plus de 3,5 tonnes
              v-flex.align-right(xs6) {{ transporteur.lower_than_3_5_licenses }}
            v-layout(row, wrap)
              v-flex(xs5) Licences moins de 3,5 tonnes
              v-flex.align-right(xs6) {{ transporteur.greater_than_3_5_licenses }}
            br
            span.grey--text Contact
            v-layout(row, wrap)
              v-flex(xs5) Téléphone
              v-flex.align-right(xs6) {{ transporteur.telephone }}
            v-layout(row, wrap)
              v-flex(xs5) Email
              v-flex.align-right(xs6) {{ transporteur.email }}
          v-card-actions
            v-spacer
            v-btn(flat, color='blue', @click.native="toggleEditMode")
              v-icon {{ isEditMode ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
              span Modifier
          v-slide-y-transition
            div(v-show="isEditMode")
              v-divider
              v-card-text
                v-text-field(input="telephone", v-model="telephone", label="Téléphone",
                  :error-messages="errors.telephone"
                )
                v-text-field(input="email", v-model="email", label="Adresse électronique",
                  :error-messages="errors.email"
                )
                v-btn(color="primary" @click.native="update") Mettre à jour
</template>

<script>
import roadPicture from '@/assets/road-1229x768.jpg'
import axios from '@/resource'

export default {
  props: {
    transporteurSiret: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      transporteur: {},
      email: '',
      telephone: '',
      isEditMode: false,
      errors: {}
    }
  },

  created () {
    // Workaround asset loading, for now...
    this.roadPicture = roadPicture
  },

  mounted () {
    axios.get(this.getDetailUrl()).then(response => {
      this.loadData(response.data)
    })
  },

  methods: {
    loadData (data) {
      this.transporteur = data
      this.telephone = this.transporteur.telephone
      this.email = this.transporteur.email
    },

    getDetailUrl () {
      return `/transporteurs/${this.transporteurSiret}/`
    },

    toggleEditMode () {
      this.isEditMode = !this.isEditMode
    },

    update () {
      axios.patch(this.getDetailUrl(), {
        email: this.email,
        telephone: this.telephone
      }).then(response => {
        this.loadData(response.data)
        this.errors = {}
        this.isEditMode = false
      }).catch(error => {
        if (error.response && error.response.data) {
          this.errors = error.response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.no-link
  color: inherit
  text-decoration: none

.align-right
  text-align: right
</style>
