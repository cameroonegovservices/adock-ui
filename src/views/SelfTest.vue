<template lang="pug">
  v-container(fluid grid-list-lg)
    v-alert(
      type="error"
      :value="!!errorMessage"
    ) {{ errorMessage }}
    v-layout(row wrap)
      v-flex(xs12 md3)
        v-layout(column)
          v-btn(v-for="(label, action) in actions" :key="action" @click="postSelfTest(action)") {{ label }}
      v-flex(xs12 md9)
        v-card
          v-card-text {{ output }}
</template>

<script>
import api from "@/api";

export default {
  name: "self-test",

  data() {
    return {
      actions: [],
      errorMessage: "",
      output: ""
    };
  },

  async created() {
    const response = await api.get(api.selfTestUrl);
    if (response.status === 200) {
      this.actions = response.data.actions;
    }
  },

  methods: {
    async postSelfTest(name) {
      this.errorMessage = "";
      this.output = "";
      const response = await api.post(api.selfTestUrl, {
        [name]: true
      });
      if (response.status === 200) {
        this.output = response.data.output;
      } else {
        this.errorMessage = response.data.message;
      }
    }
  }
};
</script>
