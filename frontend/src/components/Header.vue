<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <v-app-bar app color="white" elevation="1" height="64">
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>

    <v-toolbar-title class="text-h6 font-weight-bold">
      <router-link to="/" class="text-decoration-none text-primary">
        Laneville Church
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn variant="text" to="/" class="mx-2">
        Home
      </v-btn>
      <v-btn variant="text" to="/im-new" class="mx-2">
        I'm New
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" @click="drawer = false">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item to="/im-new" @click="drawer = false">
        <v-list-item-title>I'm New</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-toolbar-title a {
  color: inherit !important;
}

.v-toolbar-title a:hover {
  text-decoration: none;
}
</style>