<template lang="pug">
  v-container.adock-login-overlay(fluid fill-height)
    v-layout(row align-center justify-center)
      v-flex(xs12 sm6 md4 elevation-9 text-xs-center)
        v-toolbar.pt-5.blue.darken-2
          v-toolbar-title.white--text
            h4 Création de compte
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
                label="Prénom"
                v-model="firstName"
                :rules="requiredRules"
                validate-on-blur
                :error-messages="fieldErrors.first_name"
              )
              v-text-field(
                label="Nom"
                v-model="lastName"
                :rules="requiredRules"
                validate-on-blur
                :error-messages="fieldErrors.last_name"
              )
              v-text-field(
                label="Adresse électronique"
                v-model="email"
                :rules="emailRules"
                validate-on-blur
                :error-messages="fieldErrors.email"
              )
              v-text-field(
                label="Mot de passe"
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
                ) Créer le compte
</template>

<script>
import api from "@/api";
import { emailRules, passwordRules, requiredRules } from "@/mixins";

export default {
  name: "login-create",

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isValid: false,
      isPlainPassword: false,
      errorMessage: "",
      fieldErrors: {}
    };
  },

  created() {
    this.emailRules = emailRules;
    this.passwordRules = passwordRules;
    this.requiredRules = requiredRules;
  },

  computed: {
    isDisabled() {
      // Only for submit button
      const statuses = [];
      this.emailRules.forEach(rule => statuses.push(rule(this.email)));
      this.passwordRules.forEach(rule => statuses.push(rule(this.password)));
      return !statuses.every(v => v === true);
    }
  },

  methods: {
    async submit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        const data = await api.loginCreate({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        });
        if (data.errors) {
          if (data.errors.main && data.errors.main.message) {
            this.errorMessage = data.errors.main.message;
          }

          if (data.errors.fields) {
            this.fieldErrors = data.errors.fields;
          }
        } else {
          this.errorMessage = "";
          console.log("Validation email");
        }
      }
    }
  }
};
</script>
