import { createRouter, createWebHistory } from "vue-router";

import TodoMain from "./pages/TodoMain.vue";
import AddTask from "./pages/AddTask.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/todos" },
    { path: "/todos", component: TodoMain },
    { path: "/addTask", component: AddTask },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
