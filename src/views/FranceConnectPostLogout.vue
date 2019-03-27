<template lang="pug">
  div
</template>

<script>
export default {
  name: "franceconnect-post-logout",

  mounted() {
    this.$router.push({ name: "search" });
    this.$store.commit("MESSAGE_ADD", {
      message: "L'utilisateur a été déconnecté de A Dock et de FranceConnect"
    });
  }
};
</script>
