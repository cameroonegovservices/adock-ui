<template lang="pug">
  v-card(v-if="percent != null", dark, :color="statusColor")
    v-card-text(v-if="completed")
      v-icon done
    v-card-text(v-else) {{ percent }}&nbsp;%
</template>

<script>
export default {
  props: {
    percent: {
      type: Number
    }
  },

  computed: {
    completed () {
      return this.percent === 100
    },

    statusColor () {
      if (this.completed) {
        return 'green'
      } else {
        return 'orange'
      }
    }
  }
}
</script>
