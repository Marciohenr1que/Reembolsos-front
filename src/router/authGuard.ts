import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const token = localStorage.getItem("token");
  const role = Number(localStorage.getItem("role"));

  const isAuthenticated = !!token;

  const roleRoutes: Record<number, string> = {
    0: "/dashboard/employee",
    1: "/dashboard/manager",
  };

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.path === "/dashboard" && isAuthenticated) {
    next(roleRoutes[role] || "/dashboard");
  } else {
    next();
  }
}
