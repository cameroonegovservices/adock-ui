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
                  :disabled="!isValid"
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
      password: ""
    };
  },

  mounted() {
    // Don't ask me why I need this
    this.isValid = false;
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        api.login(this.email, this.password).then(data => console.log(data));
      }
    }
  }
};
</script>
