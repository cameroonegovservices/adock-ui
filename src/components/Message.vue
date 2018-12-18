<template lang="pug">
  v-snackbar(
    v-if="messages.length"
    top
    :timeout="8000",
    :value="messages.length"
    @input="MESSAGES_REMOVE()"
  ) {{ messagesJoined }}
    <v-btn flat color="pink" @click.native="MESSAGES_REMOVE()">Fermer</v-btn>
</template>

<script>
/* Limitation, when the timeout expires all messages are removed whatever the
   time on display. Our current use case don't need something smarter.
   BTW It will be a nice improvement to pop message one by one.
*/
import { mapState, mapMutations } from "vuex";

export default {
  name: "message",

  computed: {
    messagesJoined() {
      return this.messages.join(" ");
    },
    ...mapState(["messages"])
  },

  methods: {
    ...mapMutations(["MESSAGES_REMOVE"])
  }
};
</script>
