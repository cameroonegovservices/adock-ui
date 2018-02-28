<template>
  <v-app>
    <v-toolbar app fixed light>
      <v-spacer/>
      <v-toolbar-title>A Dock</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style scoped>
.toolbar {
  background-image: url(assets/marianne.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 1em 0;
}
</stylet>
