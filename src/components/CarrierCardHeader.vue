<template lang="pug">
v-img.white--text(:src="roadPicture" height="200px")
  v-container(fill-height fluid)
    v-layout.pa-4(column reverse)
      v-flex.flex-bottom(xs10)
        v-layout
          v-flex(xs10 sm11)
            v-layout(align-start justify-start)
              v-flex
                span.headline {{ carrier.enseigne }}
                p.subheadline.white--text.text--darken-1 {{ carrier.libelle_ape }}
                div(v-if="withEditButton")
                  p.subheadline.white--text.text--darken-1(v-if="isSubsidiary")
                    | Filiale de
                    |
                    router-link.white--text(:to="{name: 'carrier_detail', params: {carrierSiret: this.headquarters.siret }}") {{ headquarters.enseigne }} ({{ headquarters.completeness }} %)
                  p.subheadline.white--text.text--darken-1(v-else)
                    | Siège de l'entreprise
                    span(v-if="carrier.other_facilities.length > 0")
                      |  -
                      |
                      a.white--text.adock-link(
                        @click="$vuetify.goTo('#facilities')"
                      ) Autres établissements
            template(
              v-if="withEditButton"
            )
              v-btn.ma-0.mt-2(
                dark
                :color="carrier.completeness === 100 ? 'green' : 'orange'"
                :to="{name: 'carrier_edit', params: {carrierSiret: carrier.siret}}"
              )
                v-icon(v-if="carrier.is_locked" left) lock
                span(v-if="carrier.completeness === 100") Modifier la fiche
                span(v-else) Compléter la fiche ({{ carrier.completeness }} %)
              v-btn.ma-0.ml-2.mt-2(
                dark
                :to="{name: 'carrier_certificate', params: { carrierSiret: carrier.siret }}"
              )
                v-icon(v-if="carrier.is_locked" left) lock
                span Générer une attestation
          v-flex(xs2 sm1)
            v-tooltip(
              activator=".clipboard"
              top
              v-model="copied"
            )
              span Adresse copiée dans le presse-papier (Ctrl + v pour coller).
            v-btn.clipboard(
              small
              fab
              :data-clipboard-text="detailUrl"
            )
              v-icon share
          v-flex(hidden-xs-only v-if="carrier.objectif_co2")
            img.adock-objectif-co2.elevation-16(
              v-if="carrier.objectif_co2 === 'ENLISTED'"
              src="@/assets/logo-objectif-co2-charte.jpg"
            )
            img.adock-objectif-co2.elevation-16(
              v-if="carrier.objectif_co2 === 'LABELLED'"
              src="@/assets/logo-objectif-co2-label.jpg"
            )
</template>

<style lang="stylus">
.adock-objectif-co2
  display: flex
  border: 6px solid white
  border-radius: 4px
  width: 64px

.adock-link
  text-decoration: underline

.subheadline
  margin-bottom: 0
</style>

<script>
import ClipboardJS from "clipboard";

import roadPicture from "@/assets/road.jpg";
import roadDisabledPicture from "@/assets/road-disabled.jpg";

export default {
  name: "carrier-card-header",

  props: {
    carrier: {
      type: Object,
      required: true
    },

    detailUrl: {
      type: String,
      required: false,
      default: ""
    },

    withEditButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      copied: false
    };
  },

  created() {
    let clipboard = new ClipboardJS(".clipboard");
    clipboard.on("success", () => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  },

  computed: {
    roadPicture() {
      return this.carrier.deleted_at || this.carrier.sirene_deleted_at
        ? roadDisabledPicture
        : roadPicture;
    },

    headquarters() {
      if (this.carrier.other_facilities == null) {
        return null;
      }

      const filteredFacilities = this.carrier.other_facilities.filter(
        facility => facility.is_siege
      );
      if (filteredFacilities.length > 0) {
        return filteredFacilities[0];
      } else {
        return null;
      }
    },

    isSubsidiary() {
      // When the carrier is a subsidiary, the list of other facilities have a headquarters
      return this.headquarters != null;
    }
  }
};
</script>
