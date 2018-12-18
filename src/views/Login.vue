<template lang="pug">
  v-container.adock-login-overlay(fluid fill-height)
    v-layout(row align-center justify-center)
      v-flex(xs12 sm4 elevation-9 text-xs-center)
        v-toolbar.pt-5.blue.darken-2
          v-toolbar-title.white--text
            h4 Connectez-vous
        v-card
          v-card-text.pt-4
            v-layout(align-center justify-center)
              v-flex
                v-btn.adock-france-connect
            v-layout(align-center justify-center)
              v-flex
                a(
                  href="https://app.franceconnect.gouv.fr/en-savoir-plus"
                ) Qu’est-ce que FranceConnect ?
            v-layout.pt-4(align-center justify-center)
              v-flex
                span.adock-login-or ou
            v-form(
              v-model="isValid"
              ref="form"
            )
              v-alert(
                type="error"
                :value="!!errorMessage"
              ) {{ errorMessage }}
              v-text-field(
                label="Adresse électronique"
                v-model="email"
                :rules="emailRules"
                required
                validate-on-blur
              )
              v-text-field(
                label="Mot de passe"
                v-model="password"
                :rules="passwordRules"
                :append-icon="isPlainPassword ? 'visibility' : 'visibility_off'"
                @click:append="() => (isPlainPassword = !isPlainPassword)"
                :type="isPlainPassword ? 'text': 'password'"
                counter
                required
                validate-on-blur
              )
              v-layout(justify-space-between)
                v-btn(
                  color="primary"
                  @click="submit"
                  :disabled="isDisabled"
                ) Se connecter
</template>

<style lang="stylus">
.adock-login-header
  background-color: #003189 !important;

.adock-login-overlay
  background: #eeeeee

.adock-login-or
  color: #999999

.adock-france-connect
  display: inline-block
  height: 52px
  width: 186px
  margin: auto
  margin-bottom: 8px
  background-image: url("../assets/france-connect-white.svg")
  background-repeat: no-repeat
  background-size: cover
  cursor: pointer

.adock-france-connect:hover
  background-image: url("../assets/france-connect-hover.svg")
</style>

<script>
/* To avoid to display fields in error when the user types they are validated on
  blur event but it's nice to change the state of submit button before the blur
  event. To provide that feature, the component provides a computed value
  dedicated to the submit button.
*/

import api from "@/api";

export default {
  name: "login",

  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "Une adresse électronique est requise.",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'adresse électronique n'est pas valide."
      ],
      passwordRules: [
        v => !!v || "Un mot de passe est requis.",
        v =>
          (v && v.length >= 8) ||
          "Le mot de passe doit au moins avoir 8 caractères."
      ],
      isValid: false,
      isPlainPassword: false,
      password: "",
      errorMessage: ""
    };
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
    async submit() {
      if (this.$refs.form.validate()) {
        const data = await api.login(this.email, this.password);
        if (data.errors) {
          if (data.errors.main && data.errors.main.message) {
            this.errorMessage = data.errors.main.message;
          }

          if (data.errors.fields) {
            this.fieldErrors = data.errors.fields;
          }
        }

        if (data.isAuthenticated) {
        }

      }
    }
  }
};
</script>
