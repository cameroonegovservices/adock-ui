<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Message',

  computed: {
    ...mapState([
      'messages'
    ])
  },

  methods: {
    ...mapMutations([
      'POP_MESSAGE'
    ])
  }
}
</script>

<template lang="pug">
  v-snackbar(
    v-if="messages.length > 0"
    top
    :timeout="6000",
    :color="messages[0].color"
    :value="messages.length > 0"
    @input="POP_MESSAGE()"
  ) {{ messages[0].text }}
    <v-btn flat color="pink" @click.native="POP_MESSAGE()">Fermer</v-btn>
</template>
