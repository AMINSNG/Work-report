import api from "../../../services/api";
import type { LoginFormData, LoginResponse } from "../types/auth.types";

export const LoginUser = async (
  data: LoginFormData,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/", data);
  return response.data;
};
