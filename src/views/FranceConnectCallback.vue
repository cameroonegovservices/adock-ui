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

  mounted() {
    console.log(this.$route.query);
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;

    const params = {
      code: this.code,
      state: this.state
    };
    const response = api.get(api.franceConnectCallbackUrl, params);
    if (response.status === 200) {
      const data = {
        tokenType: response.data.token_type,
        token: response.data.token,
        expiresIn: response.data.expires_in,
        idToken: response.data.id_token
      };
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
      this.message = response.data.message;
    }
  }
};
</script>
