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
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 1em 0;
}
</stylet>
