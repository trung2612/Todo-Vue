import { createRouter, createWebHashHistory } from "vue-router";

import TodoScreen from "@/feature/TodoScreen/TodoScreen.vue";
import LoginScreen from "@/feature/LoginScreen/LoginScreen.vue";

const routes = [
  { path: '/',name:"TodoScreen", component: TodoScreen },
  { path: '/login',name:"LoginScreen", component: LoginScreen },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;