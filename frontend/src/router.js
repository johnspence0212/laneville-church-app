import { createRouter, createWebHistory } from "vue-router";
import PageView from "./views/PageView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: PageView,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageView,
    },
  ],
});
