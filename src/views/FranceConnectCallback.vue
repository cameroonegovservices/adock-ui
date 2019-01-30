<template lang="pug">
  v-container(fluid fill-height)
    v-layout(row align-center justify-center)
      v-flex(xs12)
        v-card
          v-card-text
            p {{ code }}
            p {{ state }}
            p {{ message }}

</template>

<script>
import api from "@/api";

export default {
  name: "franceconnect-callback",

  data() {
    return {
      code: "",
      state: "",
      message: ""
    };
  },

  async mounted() {
    console.log(this.$route.query);
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;

    const data = await api.franceConnectCallback(this.code, this.state);
    if (data.token) {
      console.log(data);
      this.$store.dispatch("userLogIn", data);
      this.$store.commit("MESSAGE_ADD", {
        message: `Connecté en tant que « ${
          this.$store.state.user.email
        } » via FranceConnect.`
      });
      this.$router.push({
        name: "search"
      });
    } else {
      this.message = data.error.message;
    }
  }
};
</script>
