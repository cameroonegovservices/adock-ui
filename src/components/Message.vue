<script>
/* Limitation, when the timeout expires all messages are removed whatever the
   time on display. Our current use case don't need something smarter.
*/
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Message',

  computed: {
    messagesJoined () {
      return this.messages.join(' ')
    },
    ...mapState([
      'messages'
    ])
  },

  methods: {
    ...mapMutations([
      'REMOVE_MESSAGES'
    ])
  }
}
</script>

<template lang="pug">
  v-snackbar(
    v-if="messages.length"
    top
    :timeout="8000",
    :value="messages.length"
    @input="REMOVE_MESSAGES()"
  ) {{ messagesJoined }}
    <v-btn flat color="pink" @click.native="REMOVE_MESSAGES()">Fermer</v-btn>
</template>
