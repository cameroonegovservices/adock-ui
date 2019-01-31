<template lang="pug">
  v-container.adock-login-overlay(fluid fill-height)
    v-layout(row align-center justify-center)
      v-flex(xs12 sm6 md4 elevation-9 text-xs-center)
        v-toolbar.pt-5.blue.darken-2
          v-toolbar-title.white--text
            h4 Connectez-vous
        v-card
          v-card-text.pt-4
            v-layout(align-center justify-center)
              v-flex
                v-btn.adock-france-connect(
                  :href="franceConnectAuthorizeUrl"
                )
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
              @submit="submit"
            )
              v-alert(
                type="error"
                :value="!!errorMessage"
              ) {{ errorMessage }}
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
              v-layout(align-center justify-space-between)
                router-link(:to="{name: 'account_create'}") Créer un compte
                v-btn(
                  color="primary"
                  @click="submit"
                  :disabled="isDisabled"
                  type="submit"
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
import { emailRules, passwordRules } from "@/mixins";

export default {
  name: "account-login",

  data() {
    return {
      franceConnectAuthorizeUrl:
        process.env.VUE_APP_API_URL + "accounts/fc/authorize",
      email: "",
      isValid: false,
      isPlainPassword: false,
      password: "",
      errorMessage: "",
      fieldErrors: {}
    };
  },

  created() {
    this.emailRules = emailRules;
    this.passwordRules = passwordRules;
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
        this.errorMessage = "";
        this.fieldErrors = {};

        const response = await api.post(api.loginUrl, {
          username: this.email,
          password: this.password
        });
        if (response.status === 200) {
          this.$store.dispatch("userLogIn", response.data);
          this.$store.commit("MESSAGE_ADD", {
            message: `Connecté en tant que « ${this.$store.state.user.email} ».`
          });
          this.$router.push({
            name: "search"
          });
        } else {
          if (response.data.errors) {
            if (response.data.errors.fields) {
              this.fieldErrors = response.data.errors.fields;
            }
            if (response.data.errors.__all__) {
              // Change the original message
              this.errorMessage =
                "L'adresse électronique et le mot de passe ne correspondent pas.";
            }
          } else {
            this.errorMessage = response.data.message;
          }
        }
      }
    }
  }
};
</script>
