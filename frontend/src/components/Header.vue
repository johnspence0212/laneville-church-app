<script setup>
import { ref, computed, onMounted } from 'vue'

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

// Find the home page (always shown first if it exists)
const homePage = computed(() => {
  return pages.value.find(page => page.slug === 'home')
})

// Get top-level pages (section is null or empty, excluding home)
const topLevelPages = computed(() => {
  return pages.value
    .filter(page => (!page.section || page.section === '') && page.slug !== 'home')
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Get subpages for a given parent section (sorted by order)
function getSubpages(parentSection) {
  return pages.value
    .filter(page => page.section === parentSection)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

// Check if a page has children
function hasChildren(pageSlug) {
  return getSubpages(pageSlug).length > 0
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
      <!-- Home always first -->
      <v-btn 
        v-if="homePage" 
        variant="text" 
        :to="`/${homePage.slug}`" 
        class="mx-2"
      >
        Home
      </v-btn>
      
      <!-- Dynamic top-level pages -->
      <template v-for="page in topLevelPages" :key="page.id">
        <!-- Page with children - dropdown -->
        <v-menu v-if="hasChildren(page.slug)" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" class="mx-2">
              {{ page.title }}
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- Parent page as first item -->
            <v-list-item :to="`/${page.slug}`">
              <v-list-item-title>{{ page.title }}</v-list-item-title>
            </v-list-item>
            <!-- Child pages -->
            <v-list-item 
              v-for="subpage in getSubpages(page.slug)" 
              :key="subpage.id"
              :to="`/${subpage.slug}`"
            >
              <v-list-item-title>{{ subpage.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
        <!-- Page without children - regular link -->
        <v-btn 
          v-else
          variant="text" 
          :to="`/${page.slug}`" 
          class="mx-2"
        >
          {{ page.title }}
        </v-btn>
      </template>
    </v-toolbar-items>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <!-- Home always first -->
      <v-list-item 
        v-if="homePage"
        :to="`/${homePage.slug}`" 
        @click="drawer = false"
      >
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      
      <!-- Dynamic top-level pages -->
      <template v-for="page in topLevelPages" :key="page.id">
        <!-- Page with children - expandable -->
        <v-list-group v-if="hasChildren(page.slug)" :value="page.slug">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ page.title }}</v-list-item-title>
            </v-list-item>
          </template>
          
          <!-- Parent page -->
          <v-list-item :to="`/${page.slug}`" @click="drawer = false">
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item>
          
          <!-- Children -->
          <v-list-item 
            v-for="subpage in getSubpages(page.slug)" 
            :key="subpage.id"
            :to="`/${subpage.slug}`"
            @click="drawer = false"
          >
            <v-list-item-title>{{ subpage.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        
        <!-- Page without children - regular link -->
        <v-list-item 
          v-else
          :to="`/${page.slug}`" 
          @click="drawer = false"
        >
          <v-list-item-title>{{ page.title }}</v-list-item-title>
        </v-list-item>
      </template>
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