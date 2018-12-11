<template lang="pug">
  v-container.adock-login-overlay(fluid fill-height)
    v-layout(flex align-center justify-center)
      v-flex(xs12 sm4 elevation-6)
        v-toolbar.pt-5.blue.darken-2
          v-toolbar-title.white--text
            h4 Connexion
        v-card
          v-card-text.pt-4
            v-form(
              v-model="isValid"
              ref="form"
              lazy-validation
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
                v-btn(@click="clear") Effacer
</template>

<style lang="stylus">
.adock-login-header
  background-color: #003189 !important;

.adock-login-overlay
  background: #8BC34A
</style>

<script>
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
        v => (v && v.length >= 8) || "Le mot de passe doit au moins avoir 8 caractères."
      ],
      isValid: false,
      isPlainPassword: false,
      password: ""
    };
  },

  mounted () {
    // Don't ask me why I need this
    this.isValid = false;
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$refs.form.$el.submit();
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
