import type { LoginFormData, LoginResponse } from "../types/auth.types";
import api from "./api";

export const LoginUser = async (
  data: LoginFormData,
): Promise<LoginResponse> => {
  const formData = new URLSearchParams();

  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);

  const response = await api.post<LoginResponse>("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};
