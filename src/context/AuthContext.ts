import { createContext } from "react";
import type { UserProfile } from "../types/user.types";

export type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
