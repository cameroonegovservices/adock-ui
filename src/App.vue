<template lang="pug">
  v-app
    v-toolbar(app, fixed, light)
      img(src='./assets/marianne.svg', width='80px')
      v-toolbar-title A Dock
    v-content
      router-view
</template>
