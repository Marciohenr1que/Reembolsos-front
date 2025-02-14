import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserService } from "../../api/services/UserService";
import ApiClient from "../../api/ApiClient";

interface UserData {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
  role: number;
}

vi.mock("../../api/ApiClient.ts", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("UserService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("registerUser", () => {
    it("deve chamar ApiClient.post com os dados corretos", async () => {
      const userData: UserData = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        password_confirmation: "password123",
        role: 1,
      };

      await UserService.registerUser(userData);

      expect(ApiClient.post).toHaveBeenCalledWith("/users", {
        user: {
          email: "test@example.com",
          password: "password123",
          name: "Test User",
          password_confirmation: "password123",
          role: 1,
        },
      });
    });

    it("deve lançar um erro se ApiClient.post falhar", async () => {
      const userData: UserData = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        password_confirmation: "password123",
        role: 1,
      };

      const errorMessage = "Erro de registro";
      (ApiClient.post as vi.MockedFunction).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(UserService.registerUser(userData)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
