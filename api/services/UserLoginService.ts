import ApiClient from "../ApiClient";

interface LoginData {
  email: string;
  password: string;
}

export const UserLoginService = {
  async loginUser(
    data: LoginData
  ): Promise<{ token: string; user: { role: number } }> {
    const response = await ApiClient.post("/users/sign_in", {
      user: {
        email: data.email,
        password: data.password,
      },
    });
    return response.data;
  },
};
