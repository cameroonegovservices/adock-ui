import { mapState } from "vuex";

export const displayUserMixin = {
  computed: {
    displayUser() {
      if (this.user == null) {
        return "";
      }

      return this.user.first_name
        ? `${this.user.first_name} ${this.user.last_name}`
        : this.user.email;
    },
    ...mapState(["user"])
  }
};

export const requiredRules = [v => !!v || "Le champ est requis."];
export const emailRules = [
  v => !!v || "Une adresse électronique est requise.",
  v =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "L'adresse électronique n'est pas valide."
];
export const passwordRules = [
  v => !!v || "Un mot de passe est requis.",
  v =>
    (v && v.length >= 8) || "Le mot de passe doit au moins avoir 8 caractères."
];

export const scrollToErrorsMixin = {
  data() {
    return {
      errorMessage: null,
      fieldErrors: {}
    };
  },

  methods: {
    setErrorsAndScrollTo(data, refMainContent) {
      let scrollToTarget = null;
      this.errorMessage = null;
      this.fieldErrors = {};

      if (data.errors) {
        // Form error
        this.fieldErrors = data.errors;
        if (data.errors.__all__) {
          this.errorMessage = data.errors.__all__.join(" ");
          scrollToTarget = refMainContent;
        }
      }

      if (data.message) {
        // Global error
        this.errorMessage = data.message;
        scrollToTarget = refMainContent;
      }

      if (!scrollToTarget) {
        scrollToTarget = ".error--text";
      }

      if (scrollToTarget) {
        this.$nextTick(() => {
          this.$vuetify.goTo(scrollToTarget, {
            offset: -64
          });
        });
      }
    }
  }
};
