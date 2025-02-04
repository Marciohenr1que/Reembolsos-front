import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const isAuthenticated: boolean = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
}
