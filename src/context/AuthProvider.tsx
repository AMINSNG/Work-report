import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { UserProfile } from "../types/user.types";
import { getProfile } from "../services/userService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(() => {
    return !!(
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    );
  });

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) return;

    getProfile()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
