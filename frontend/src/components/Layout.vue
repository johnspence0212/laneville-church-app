<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main class="full-width-main">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped>
.full-width-main {
  background-color: #fafafa;
  min-height: calc(100vh - 128px);
  width: 100% !important;
  max-width: 100% !important;
  padding: 6rem 0 0 0 !important;
  margin: 0 !important;
}

.full-width-main :deep(.v-main__wrap) {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>