<template lang="pug">
  v-app
    v-toolbar(app, light)
      router-link(:to="{name: 'search'}")
        img(src='./assets/marianne.svg', width='80px')
      v-toolbar-title A Dock - Simplifions les relations transporteurs/chargeurs
      v-spacer
      span Bêta
    v-content
      router-view
</template>
