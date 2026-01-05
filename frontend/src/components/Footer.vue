<script setup>
</script>

<template>
  <v-footer app color="rgb(35, 57, 88)" height="64" class="footer-bar">
    <v-spacer></v-spacer>
    
    <div class="social-links">
      <v-btn 
        icon 
        variant="text" 
        href="https://facebook.com" 
        target="_blank"
        class="social-btn"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      
      <v-btn 
        icon 
        variant="text" 
        href="https://x.com" 
        target="_blank"
        class="social-btn"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      
      <v-btn 
        icon 
        variant="text" 
        href="https://linkedin.com" 
        target="_blank"
        class="social-btn"
      >
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
    </div>
    
    <v-spacer></v-spacer>
  </v-footer>
</template>

<style scoped>
.footer-bar {
  color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-links {
  display: flex;
  gap: 16px;
  align-items: center;
}

.social-btn {
  color: white !important;
}

.social-btn:hover {
  opacity: 0.8;
}

.social-btn .v-icon {
  color: white !important;
}
</style>
