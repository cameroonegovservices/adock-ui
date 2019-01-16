export const scrollToErrorsMixin = {
  data() {
    return {
      errorMessage: null,
      fieldErrors: {}
    };
  },

  methods: {
    setErrorsAndScrollTo(errors, refMainContent) {
      let scrollToTarget = null;

      // Error
      if (errors.main && errors.main.message) {
        this.errorMessage = errors.main.message;
        scrollToTarget = refMainContent;
      }

      if (errors.fields) {
        this.fieldErrors = errors.fields;
        if (!scrollToTarget) {
          scrollToTarget = ".error--text";
        }
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
