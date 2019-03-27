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
                data-cy="inputFirstName"
              )
              v-text-field(
                label="Nom"
                v-model="lastName"
                :rules="requiredRules"
                validate-on-blur
                :error-messages="fieldErrors.last_name"
                data-cy="inputLastName"
              )
              v-text-field(
                label="Adresse électronique"
                v-model="email"
                :rules="emailRules"
                validate-on-blur
                :error-messages="fieldErrors.email"
                data-cy="inputEmail"
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
                data-cy="inputPassword"
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
  name: "account-create",

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
        const response = await api.post(api.loginCreateUrl, {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password
        });
        if (response.status === 200) {
          this.errorMessage = "";
          this.$store.commit("MESSAGE_ADD", {
            message: `Le compte est créé, vous devez maintenant l'activer en cliquant sur le mail envoyé à « ${
              this.email
            } ».`
          });
          this.$router.push({
            name: "account_activate"
          });
        } else {
          if (response.data.errors) {
            this.fieldErrors = response.data.errors;
          }
        }
      }
    }
  }
};
</script>
