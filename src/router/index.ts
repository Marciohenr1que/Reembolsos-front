import { createRouter, createWebHistory, Router } from "vue-router";
import routes from "./routes";
import authGuard from "./authGuard";

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
