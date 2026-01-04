<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/" @click="closeMenu">Laneville Church</router-link>
      </div>

      <button
        class="menu-button"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="menu-icon"></span>
      </button>

      <nav class="desktop-nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/im-new" class="nav-link">I'm New</router-link>
      </nav>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="isMenuOpen" class="mobile-nav">
      <router-link to="/" class="mobile-nav-link" @click="closeMenu">Home</router-link>
      <router-link to="/im-new" class="mobile-nav-link" @click="closeMenu">I'm New</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  text-decoration: none;
}

.logo a:hover {
  color: #3b82f6;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.menu-button:hover {
  background-color: #f3f4f6;
}

.menu-icon {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
}

.menu-icon::before,
.menu-icon::after,
.menu-icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #374151;
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: 0;
}

.menu-icon::after {
  bottom: 0;
}

.menu-icon::before {
  top: 50%;
  transform: translateY(-50%);
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.mobile-nav {
  display: none;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
}

.mobile-nav-link {
  display: block;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .menu-button {
    display: block;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }
}
</style>