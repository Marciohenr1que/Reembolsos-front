import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserLoginService } from "../../api/services/UserLoginService";
import ApiClient from "../../api/ApiClient";

vi.mock("../../api/ApiClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("UserLoginService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve fazer login e retornar token e user role", async () => {
    const mockResponse = {
      data: {
        token: "fake_token",
        user: { role: 1 },
      },
    };

    vi.mocked(ApiClient.post).mockResolvedValue(mockResponse);

    const loginData = { email: "user@example.com", password: "securePass123" };
    const response = await UserLoginService.loginUser(loginData);

    expect(ApiClient.post).toHaveBeenCalledWith("/users/sign_in", {
      user: {
        email: loginData.email,
        password: loginData.password,
      },
    });
    expect(response).toEqual(mockResponse.data);
  });

  it("deve lançar um erro quando a API falhar", async () => {
    vi.mocked(ApiClient.post).mockRejectedValue(new Error("Login failed"));

    const loginData = { email: "user@example.com", password: "wrongPass" };

    await expect(UserLoginService.loginUser(loginData)).rejects.toThrow(
      "Login failed"
    );

    expect(ApiClient.post).toHaveBeenCalledWith("/users/sign_in", {
      user: {
        email: loginData.email,
        password: loginData.password,
      },
    });
  });
});
