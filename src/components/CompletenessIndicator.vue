<template lang="pug">
  div.indicator(v-if="percent != null" :class="statusColor")
    v-icon(v-if="completed" dark) done
    span(v-else) {{ percent }} %
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

<style>
.indicator {
  color: #fff;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  width: 48px;
  height: 48px;
  font-size: 16px;
  padding-top: 12px;
}
</style>
