<template lang="pug">
  v-app
    v-toolbar(app, fixed, light)
      v-spacer
      v-toolbar-title A Dock
    v-content
      router-view
</template>

<style scoped>
.toolbar {
  background-image: url(assets/marianne.svg);
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: 1em;
}
</stylet>
