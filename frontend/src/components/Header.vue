<script setup>
import { ref, onMounted } from 'vue'

const drawer = ref(false)
const pages = ref([])

// Fetch all pages from PocketBase
async function fetchPages() {
  try {
    const res = await fetch('http://127.0.0.1:8090/api/collections/pages/records')
    const data = await res.json()
    pages.value = data.items
  } catch (err) {
    console.error('Error fetching pages:', err)
  }
}

// Get subpages for a given parent section
function getSubpages(parentSection) {
  return pages.value.filter(page => page.section === parentSection)
}

onMounted(fetchPages)
</script>

<template>
  <v-app-bar app color="rgb(35, 57, 88)" elevation="1" height="64">
    <div class="header-left-section">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none hamburger-btn"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="text-h6 font-weight-bold header-title">
        <router-link to="/" class="text-decoration-none text-primary">
          Laneville Church
        </router-link>
      </v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn variant="text" to="/" class="mx-2">
        Home
      </v-btn>
      
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" class="mx-2">
            I'm New Here
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/im-new-here">
            <v-list-item-title>Overview</v-list-item-title>
          </v-list-item>
          <v-list-item 
            v-for="subpage in getSubpages('im-new-here')" 
            :key="subpage.id"
            :to="`/${subpage.slug}`"
          >
            <v-list-item-title>{{ subpage.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" @click="drawer = false">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      
      <v-list-group value="im-new-here">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title>I'm New Here</v-list-item-title>
          </v-list-item>
        </template>
        
        <v-list-item to="/im-new-here" @click="drawer = false">
          <v-list-item-title>Overview</v-list-item-title>
        </v-list-item>
        
        <v-list-item 
          v-for="subpage in getSubpages('im-new-here')" 
          :key="subpage.id"
          :to="`/${subpage.slug}`"
          @click="drawer = false"
        >
          <v-list-item-title>{{ subpage.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-app-bar {
  color: white !important;
}

.v-toolbar-title {
  color: white !important;
}

.v-toolbar-title a {
  color: white !important;
}

.v-toolbar-title a:hover {
  color: white !important;
  text-decoration: none;
}

.v-btn__content {
  color: white !important;
}

.v-btn:hover .v-btn__content {
  color: white !important;
}

.header-left-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-title {
  margin: 0 !important;
}

.hamburger-btn {
  margin: 0 !important;
}

/* Add left padding on desktop when hamburger is hidden */
@media (min-width: 768px) {
  .header-left-section {
    padding-left: 16px;
  }
}

/* Dropdown menu styling */
.v-list {
  background-color: white !important;
}

.v-list-item {
  color: #1a1a1a !important;
}

.v-list-item:hover {
  background-color: #f3f4f6 !important;
}

.v-list-item-title {
  color: #1a1a1a !important;
}

</style>