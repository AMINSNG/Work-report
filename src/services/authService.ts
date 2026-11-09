import type {
  LoginFormData,
  LoginResponse,
} from "../features/auth/types/auth.types";
import api from "./api";

export const LoginUser = async (
  data: LoginFormData,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/", data);
  return response.data;
};
