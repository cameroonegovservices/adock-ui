<template lang="pug">
  v-layout(v-if="user")
    v-flex(xs12 md12)
      v-alert(
        :value="!!errorMessage"
      ) {{ errorMessage }}
      v-checkbox(
        v-if="!user.has_accepted_cgu"
        v-model="hasAcceptedCGU"
        label="Je certifie avoir lu et accepté les CGU"
        :disabled="cguCheckboxDisabled"
        :error-messages="fieldErrors.has_accepted_cgu"
      )
      v-checkbox(
        v-if="!user.has_subscribed_newsletter"
        v-model="hasSubscribedNewsletter"
        label="J'accepte être informé des nouveautés sur A Dock"
      )
      v-btn(
        v-if="!user.has_accepted_cgu || !user.has_subscribed_newsletter"
        @click="confirm"
      ) Valider
</template>

<script>
import api from "@/api";
import { getNextUrlFromRoute } from "@/router";

export default {
  name: "cgu-confirm",

  props: {
    user: {
      type: Object
    }
  },

  data() {
    return {
      errorMessage: "",
      fieldErrors: {},
      cguCheckboxDisabled: false,
      hasAcceptedCGU: false,
      hasSubscribedNewsletter: false
    };
  },

  methods: {
    async confirm() {
      const response = await api.patch(api.profileUrl, {
        has_accepted_cgu: this.hasAcceptedCGU,
        has_subscribed_newsletter: this.hasSubscribedNewsletter
      });
      if (response.status === 200) {
        // Update user
        this.$store.commit("USER_SET", response.data);
        this.$store.commit("MESSAGE_ADD", {
          message: "Vous avez approuvé les Conditions Générales d'Utilisation."
        });
        const nextUrl = getNextUrlFromRoute(this.$route);
        if (nextUrl) {
          this.$router.push({ path: nextUrl });
        } else {
          this.$router.push({ name: "search" });
        }
      } else {
        if (response.data.errors) {
          this.fieldErrors = response.data.errors;
        }
        this.errorMessage = response.data.message;
      }
    }
  }
};
</script>
