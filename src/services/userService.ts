import api from "./api";
import type { UserProfile } from "../types/user.types";

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/auth/profile");

  return response.data;
};
