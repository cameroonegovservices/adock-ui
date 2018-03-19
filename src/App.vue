<template lang="pug">
  v-app
    v-toolbar(app, fixed, light)
      router-link(:to="{name: 'search'}")
        img(src='./assets/marianne.svg', width='80px')
      v-toolbar-title A Dock - Simplifions les relations transporteurs/chargeurs
    v-content
      router-view
</template>
