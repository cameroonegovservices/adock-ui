<template lang="pug">
  v-container
    v-layout
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
          v-list(dense)
            v-list-tile
              v-list-tile-content SIRET
              v-list-tile-content.align-end {{ transporteur.siret }}
            v-list-tile
              v-list-tile-content N° TVA
              v-list-tile-content.align-end {{ transporteur.vat_number }}
            v-list-tile
              v-list-tile-content Adresse
              v-list-tile-content.align-end {{ transporteur.adresse }}
            v-list-tile
              v-list-tile-content Ville
              v-list-tile-content.align-end {{ transporteur.code_postal }} {{ transporteur.ville }}
            v-list-tile
              v-list-tile-content Licenses plus de 3,5 tonnes
              v-list-tile-content.align-end {{ transporteur.lower_than_3_5_licenses }}
            v-list-tile
              v-list-tile-content Licenses moins de 3,5 tonnes
              v-list-tile-content.align-end {{ transporteur.greater_than_3_5_licenses }}
            v-list-tile
              v-list-tile-content Téléphone
              v-list-tile-content.align-end {{ transporteur.telephone }}
            v-list-tile
              v-list-tile-content Email
              v-list-tile-content.align-end {{ transporteur.email }}
          v-card-actions
            v-spacer
            v-btn(flat, color='orange', @click.native="toggleEditMode")
              v-icon {{ isEditMode ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
              span Modifier
          v-slide-y-transition
            div(v-show="isEditMode")
              v-divider
              v-card-text
                v-text-field(input="telephone", v-model="telephone", label="Téléphone")
                v-text-field(input="email", v-model="email", label="Adresse électronique")
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
      isEditMode: false
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
        this.isEditMode = false
      }).catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
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
</style>
