<template lang="pug">
  v-container(fluid grid-list-lg)
    v-layout(row wrap)
      v-flex(xs12 md6)
        v-layout(row wrap)
          v-flex(v-if="allowed" md6 d-flex)
            v-card
              v-card-text.text-xs-center
                p.display-2 {{ modifiedCarriers }}
                p Fiches transporteur validées
          v-flex(xs12 md6 d-flex)
            v-card
              v-card-text.text-xs-center
                p.display-2 {{ meta.carrier.localeDate }}
                p Date de dernière mise à jour
          v-flex(xs12 md6 d-flex)
            v-card
              v-card-text.text-xs-center
                p.display-2 {{ meta.carrier.localeCount }}
                p Nombre de transporteurs
          v-flex(md6 d-flex)
            v-card
              v-card-text.text-xs-center
                p.display-2 {{ meta.version }}
                p Version de l'application serveur
          v-flex(md6 d-flex)
            v-card
              v-card-text.text-xs-center
                p.display-2 {{ version }}
                p Version de l'application UI
      v-flex(v-if="allowed" xs12 md6)
        v-card
          v-card-title(primary-title)
            h3.headline Nombre de fiches validées par mois
          v-card-text
            dl.adock-chart(v-if="modifiedCarriersPerMonth.length" :style="modifiedScaleProperty")
              template(v-for="item in modifiedCarriersPerMonth")
                dt.adock-chart-month {{ item.month | asLocaleMonth }}
                dd.adock-chart-bar(:style="getmodifiedValueProperty(item.count)")
                  span.adock-chart-value {{ item.count }}
    v-flex(v-if="!allowed" xs12 md6)
      p Vous disposez d'un accès restreint aux statistiques.
</template>

<style lang="stylus">
.adock-chart
  display: grid
  grid-auto-columns: 1fr
  grid-template-rows: repeat(var(--scale, 100), minmax(0, 1fr)) 1.4rem
  grid-column-gap: 5px
  margin: 2em auto 1em
  padding: 0 1em
  position: relative
  max-width: 70vw;
  height: calc(100vh - 64px - 13em)

.adock-chart::after
  background: #fff
  bottom: 0
  content: ' '
  height: 1.4rem
  left: 0
  position: absolute
  right: 0

.adock-chart-month
  align-items: center
  display: flex
  font-weight: bold
  grid-row: -2 / span 1
  justify-content: center
  position: relative
  text-align: center
  z-index: 2

.adock-chart-bar
  --start: calc(var(--scale) + 1 - var(--value))
  grid-row: var(--start) / -2

  /* Background colors */
  --position: calc(var(--start) / var(--scale) * 100%)
  background-image: linear-gradient(to right, #FF5733, #FFC300, #DAF7A6, #8e24aa, #2196f3)
  background-size: 1600% 100%
  background-position: var(--position) 0

  /* Other styles */
  border-radius: 5px 5px 0 0
  color: #000
  list-style: none
  position: relative

.adock-chart-value
  background: #fff
  bottom: 100%
  display: inline-block
  left: 50%
  padding: 0 0.4em
  position: absolute
  transform: translate(-50%, -1px)
</style>

<script>
import { mapState } from "vuex";

import api from "@/api";

import { version } from "@/../package.json";

export default {
  name: "stats",

  data() {
    return {
      allowed: false,
      modifiedCarriers: 0,
      modifiedCarriersPerMonth: [],
      version
    };
  },

  created() {
    this.setup();
  },

  watch: {
    $route(to) {
      if (to.name === "stats") {
        this.setup();
      }
    }
  },

  computed: {
    modifiedScaleProperty() {
      const maxValue = Math.max(
        ...this.modifiedCarriersPerMonth.map(item => item.count)
      );
      return `--scale: ${maxValue};`;
    },
    ...mapState(["meta"])
  },

  filters: {
    asLocaleMonth(value) {
      return new Date(value).toLocaleString("fr", { month: "long" });
    }
  },

  methods: {
    async setup() {
      const response = await api.get(api.statsUrl);
      if (response.status === 200) {
        this.modifiedCarriers = response.data["modified_carriers"];
        this.modifiedCarriersPerMonth =
          response.data["modified_carriers_per_month"];
        this.allowed = true;
      }
    },

    getmodifiedValueProperty(value) {
      if (value === 0) {
        value = 1;
      }
      return `--value: ${value};`;
    }
  }
};
</script>
