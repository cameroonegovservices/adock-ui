<template lang="pug">
  v-container.adock-login-overlay(fluid fill-height)
    v-layout(row align-center justify-center)
      v-flex(xs12 sm6 md4 elevation-9 text-xs-center)
        v-toolbar.pt-5.blue.darken-2
          v-toolbar-title.white--text
            h4 Nouveau mot de passe
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
                v-model="email"
                :disabled="true"
              )
              v-text-field(
                label="Nouveau mot de passe"
                v-model="password"
                :rules="passwordRules"
                :append-icon="isPlainPassword ? 'visibility' : 'visibility_off'"
                @click:append="() => (isPlainPassword = !isPlainPassword)"
                :type="isPlainPassword ? 'text': 'password'"
                counter
                validate-on-blur
                :error-messages="fieldErrors.password"
              )
              v-layout(justify-space-between)
                v-btn(
                  color="primary"
                  @click="submit"
                  :disabled="isDisabled"
                  type="submit"
                ) Modifier le mot de passe
</template>

<script>
import api from "@/api";
import { passwordRules } from "@/mixins";

export default {
  name: "account-password-reset",

  data() {
    return {
      password: "",
      isValid: false,
      isPlainPassword: false,
      errorMessage: "",
      fieldErrors: {}
    };
  },

  props: {
    email: {
      type: String,
      default: null,
      required: false
    },
    token: {
      type: String,
      default: null,
      required: false
    }
  },

  created() {
    this.passwordRules = passwordRules;
  },

  computed: {
    isDisabled() {
      // Only for submit button
      const statuses = [];
      this.passwordRules.forEach(rule => statuses.push(rule(this.password)));
      return !statuses.every(v => v === true);
    }
  },

  methods: {
    async submit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        const response = await api.post(api.passwordResetUrl, {
          email: this.email,
          token: this.token,
          password: this.password
        });
        if (response.status === 200) {
          this.errorMessage = "";
          this.$store.commit("MESSAGE_ADD", {
            message: `Le mot de passe du compte « ${
              this.email
            } » a été modifié, vous pouvez maintenant vous identifier.`
          });
          this.$router.push({
            name: "account_login"
          });
        } else {
          if (response.data.message) {
            this.errorMessage = response.data.message;
          }
          if (response.data.errors) {
            this.fieldErrors = response.data.errors;
          }
        }
      }
    }
  }
};
</script>
