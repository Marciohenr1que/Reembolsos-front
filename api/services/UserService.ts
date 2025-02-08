import ApiClient from "../ApiClient";

interface UserData {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
  role: number;
}

export const UserService = {
  async registerUser(data: UserData): Promise<void> {
    const payload = {
      user: {
        email: data.email,
        password: data.password,
        name: data.name,
        password_confirmation: data.password_confirmation,
        role: data.role,
      },
    };

    await ApiClient.post("/users", payload);
  },
};
