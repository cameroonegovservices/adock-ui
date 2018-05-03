<template lang="pug">
  v-alert(
    v-if="errors && errors.global"
    type="error"
    :value="true"
  ) {{ errors.global }}
</template>

<script>
export default {
  name: 'GlobalError',
  props: {
    errors: {
      type: Object,
      required: false
    }
  }
}
</script>
