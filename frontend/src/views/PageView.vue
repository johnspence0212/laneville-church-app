<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const page = ref(null);
const error = ref(null);

async function loadPage() {
  page.value = null;
  error.value = null;

  // Convert route path → slug
  // "/" => "home"
  // "/im-new/what-to-expect" => "im-new/what-to-expect"
  const slug = route.path === "/" ? "home" : route.path.substring(1);

  try {
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/pages/records?filter=slug="${slug}"`
    );
    const data = await res.json();
    page.value = data.items[0];
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(loadPage);
watch(() => route.path, loadPage);
</script>

<template>
  <v-container max-width="800" class="pa-4">
    <v-card v-if="page" elevation="0" class="transparent">
      <v-card-title class="text-h4 font-weight-bold mb-4 px-0">
        {{ page.title }}
      </v-card-title>
      <v-card-text class="px-0">
        <div v-html="page.body" class="page-content"></div>
      </v-card-text>
    </v-card>

    <v-alert v-else-if="error" type="error" class="mt-4">
      Error loading page: {{ error }}
    </v-alert>

    <v-skeleton-loader v-else type="article" class="mt-4"></v-skeleton-loader>
  </v-container>
</template>

<style scoped>
.page-content :deep(h2) {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin: 2rem 0 1rem 0 !important;
  color: #374151 !important;
}

.page-content :deep(h3) {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  margin: 1.5rem 0 0.75rem 0 !important;
  color: #374151 !important;
}

.page-content :deep(p) {
  margin-bottom: 1rem !important;
  line-height: 1.7 !important;
  color: #4b5563 !important;
}

.page-content :deep(ul), .page-content :deep(ol) {
  margin-bottom: 1rem !important;
  padding-left: 1.5rem !important;
}

.page-content :deep(li) {
  margin-bottom: 0.5rem !important;
  line-height: 1.6 !important;
}

.page-content :deep(a) {
  color: #3b82f6 !important;
  text-decoration: none !important;
}

.page-content :deep(a:hover) {
  text-decoration: underline !important;
}
</style>
