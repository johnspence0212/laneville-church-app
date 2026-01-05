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
  <div class="page-view-container">
    <div v-if="page" class="page-wrapper">
      <h1 class="page-title">{{ page.title }}</h1>
      <div v-html="page.body" class="page-content"></div>
    </div>

    <v-alert v-else-if="error" type="error" class="mt-4">
      Error loading page: {{ error }}
    </v-alert>

    <v-skeleton-loader v-else type="article" class="mt-4"></v-skeleton-loader>
  </div>
</template>

<style scoped>
.page-view-container {
  width: 100%;
  max-width: 100%;
  padding: 0 2rem 2rem 2rem;
  text-align: left;
}

.page-wrapper {
  width: 100%;
  text-align: left;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: rgb(35, 57, 88);
  text-align: left;
}

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

.page-content :deep(li) {
  margin-bottom: 0.5rem !important;
  line-height: 1.6 !important;
}

.page-content :deep(h3) {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  margin: 1.5rem 0 0.75rem 0 !important;
  color: white !important;
}

.page-content :deep(p) {
  margin-bottom: 1rem !important;
  line-height: 1.7 !important;
  color: white !important;
}

.page-content :deep(ul),
.page-content :deep(ol) {
  margin-bottom: 1rem !important;
  padding-left: 1.5rem !important;
}

.page-content :deep(li) {
  margin-bottom: 0.5rem !important;
  line-height: 1.6 !important;
  color: white !important;
}

.page-content :deep(a) {
  color: #3b82f6 !important;
  text-decoration: none !important;
}

.page-content :deep(a:hover) {
  text-decoration: underline !important;
}

/* PocketBase/TinyMCE Rich Editor Styles */
.page-content :deep(.mce-content-body) {
  font-family: inherit;
  line-height: 1.6;
  color: #4b5563;
}

.page-content :deep(.mce-content-body p) {
  margin: 1rem 0;
  line-height: 1.7;
}

.page-content :deep(.mce-content-body h1),
.page-content :deep(.mce-content-body h2),
.page-content :deep(.mce-content-body h3),
.page-content :deep(.mce-content-body h4),
.page-content :deep(.mce-content-body h5),
.page-content :deep(.mce-content-body h6) {
  font-weight: 600;
  margin: 1.5rem 0 1rem 0;
  color: #1a1a1a;
}

.page-content :deep(.mce-content-body blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.page-content :deep(.mce-content-body p) {
  margin: 1rem 0;
  line-height: 1.7;
  color: white;
}

.page-content :deep(.mce-content-body blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #d1d5db;
}

.page-content :deep(.mce-content-body p) {
  margin: 1rem 0;
  line-height: 1.7;
}

.page-content :deep(.mce-content-body h1),
.page-content :deep(.mce-content-body h2),
.page-content :deep(.mce-content-body h3),
.page-content :deep(.mce-content-body h4),
.page-content :deep(.mce-content-body h5),
.page-content :deep(.mce-content-body h6) {
  font-weight: 600;
  margin: 1.5rem 0 1rem 0;
  color: white;
}

.page-content :deep(.mce-content-body h1) {
  font-size: 2.25rem;
}

.page-content :deep(.mce-content-body h2) {
  font-size: 1.875rem;
}

.page-content :deep(.mce-content-body h3) {
  font-size: 1.5rem;
}

.page-content :deep(.mce-content-body h4) {
  font-size: 1.25rem;
}

.page-content :deep(.mce-content-body ul),
.page-content :deep(.mce-content-body ol) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.page-content :deep(.mce-content-body li) {
  margin-bottom: 0.5rem;
}

.page-content :deep(.mce-content-body blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.page-content :deep(.mce-content-body code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875em;
}

.page-content :deep(.mce-content-body pre) {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.page-content :deep(.mce-content-body pre code) {
  background-color: transparent;
  padding: 0;
}

.page-content :deep(.mce-content-body strong),
.page-content :deep(.mce-content-body b) {
  font-weight: 600;
}

.page-content :deep(.mce-content-body em),
.page-content :deep(.mce-content-body i) {
  font-style: italic;
}

.page-content :deep(.mce-content-body img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>
