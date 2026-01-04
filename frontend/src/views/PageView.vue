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
  <div v-if="page" class="page-content">
    <h1>{{ page.title }}</h1>
    <div v-html="page.body"></div>
  </div>

  <p v-else-if="error" class="error-message">Error: {{ error }}</p>
  <p v-else class="loading-message">Loading…</p>
</template>

<style scoped>
.page-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.page-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  color: #374151;
}

.page-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
  color: #374151;
}

.page-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: #4b5563;
}

.page-content :deep(ul), .page-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.page-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.page-content :deep(a) {
  color: #3b82f6;
  text-decoration: none;
}

.page-content :deep(a:hover) {
  text-decoration: underline;
}

.error-message, .loading-message {
  text-align: center;
  color: #6b7280;
  font-size: 1.125rem;
}

.error-message {
  color: #dc2626;
}
</style>
