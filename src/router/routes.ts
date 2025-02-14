import { RouteRecordRaw } from "vue-router";
import Login from "../views/UserLogin.vue";
import Register from "../views/UserRegister.vue";
import EmployeeDashboard from "../views/EmployeeDashboard.vue";
import ManagerDashboard from "../views/ManagerDashboard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard/employee",
    name: "EmployeeDashboard",
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: "employee" },
  },
  {
    path: "/dashboard/manager",
    name: "ManagerDashboard",
    component: ManagerDashboard,
    meta: { requiresAuth: true, role: "manager" },
  },
];

export default routes;
