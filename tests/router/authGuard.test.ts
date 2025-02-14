import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import authGuard from "../../src/router/authGuard";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

describe("authGuard", () => {
  let next: NavigationGuardNext;
  let to: Partial<RouteLocationNormalized>;
  let from: Partial<RouteLocationNormalized>;

  beforeEach(() => {
    next = vi.fn();
    to = { meta: { requiresAuth: true }, path: "" };
    from = {};
    vi.spyOn(localStorage, "getItem");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve redirecionar para login se não estiver autenticado", () => {
    vi.spyOn(localStorage, "getItem").mockReturnValue(null);
    authGuard(
      to as RouteLocationNormalized,
      from as RouteLocationNormalized,
      next
    );

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({ name: "Login" });
  });

  it("deve redirecionar para /dashboard/employee se autenticado com role 0", () => {
    to.path = "/dashboard";
    vi.spyOn(localStorage, "getItem").mockImplementation((key) => {
      if (key === "token") return "valid_token";
      if (key === "role") return "0";
      return null;
    });

    authGuard(
      to as RouteLocationNormalized,
      from as RouteLocationNormalized,
      next
    );

    expect(next).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledWith("/dashboard/employee");
  });

  it("deve redirecionar para /dashboard/manager se autenticado com role 1", () => {
    to.path = "/dashboard";
    vi.spyOn(localStorage, "getItem").mockImplementation((key) => {
      if (key === "token") return "valid_token";
      if (key === "role") return "1";
      return null;
    });

    authGuard(
      to as RouteLocationNormalized,
      from as RouteLocationNormalized,
      next
    );

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith("/dashboard/manager");
  });

  it("deve permitir o acesso se a rota não exigir autenticação", () => {
    to.meta!.requiresAuth = false;
    vi.spyOn(localStorage, "getItem").mockReturnValue(null);

    authGuard(
      to as RouteLocationNormalized,
      from as RouteLocationNormalized,
      next
    );

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("deve permitir o acesso se autenticado e a rota não for /dashboard", () => {
    to.path = "/reembolsos";
    to.meta = { requiresAuth: false };

    vi.spyOn(localStorage, "getItem").mockImplementation((key) => {
      if (key === "token") return "valid_token";
      return null;
    });

    authGuard(
      to as RouteLocationNormalized,
      from as RouteLocationNormalized,
      next
    );

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
