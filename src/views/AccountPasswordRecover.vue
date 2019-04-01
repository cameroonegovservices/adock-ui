s<template lang="pug">
  v-container.adock-login-overlay(fluid fill-height)
    v-layout(row align-center justify-center)
      v-flex(xs12 sm6 md4 elevation-9 text-xs-center)
        v-toolbar.pt-5.blue.darken-2
          v-toolbar-title.white--text
            h4 Récupération de mot de passe
        v-card
          v-card-text.pt-4
            v-form(
              v-model="isValid"
              ref="form"
              @submit="submit"
            )
              v-alert(
                type="error"
                :value="!!errorMessage"
              ) {{ errorMessage }}
              v-text-field(
                label="Adresse électronique"
                v-model="inputEmail"
                :rules="emailRules"
                validate-on-blur
                :error-messages="fieldErrors.email"
              )
              v-layout(justify-space-between)
                v-btn(
                  color="primary"
                  @click="submit"
                  :disabled="isDisabled"
                  type="submit"
                ) Récupérer le mot de passe
</template>

<script>
import api from "@/api";
import { emailRules } from "@/mixins";

export default {
  name: "account-password-recover",

  data() {
    return {
      inputEmail: this.email,
      isValid: false,
      errorMessage: "",
      fieldErrors: {}
    };
  },

  props: {
    email: {
      type: String,
      default: null,
      required: false
    }
  },

  watch: {
    email(newEmail) {
      this.inputEmail = newEmail;
    }
  },

  created() {
    this.emailRules = emailRules;
  },

  computed: {
    isDisabled() {
      // Only for submit button
      const statuses = [];
      this.emailRules.forEach(rule => statuses.push(rule(this.inputEmail)));
      return !statuses.every(v => v === true);
    }
  },

  methods: {
    async submit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        const response = await api.post(api.passwordRecoverUrl, {
          email: this.inputEmail
        });
        if (response.status === 200) {
          this.errorMessage = "";
          this.$store.commit("MESSAGE_ADD", {
            message: response.data.message
          });
          this.$router.push({
            name: "account_login"
          });
        } else {
          if (response.data.errors) {
            this.fieldErrors = response.data.errors;
          }
          if (response.data.message) {
            this.errorMessage = response.data.message;
          }
        }
      }
    }
  }
};
</script>
