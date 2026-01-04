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
  <main v-if="page">
    <h1>{{ page.title }}</h1>
    <div v-html="page.body"></div>
  </main>

  <p v-else-if="error">Error: {{ error }}</p>
  <p v-else>Loading…</p>
</template>
