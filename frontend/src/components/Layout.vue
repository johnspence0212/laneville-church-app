<script setup>
import Header from './Header.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: #fafafa;
  min-height: calc(100vh - 64px);
}
</style>