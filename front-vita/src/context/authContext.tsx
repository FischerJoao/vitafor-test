import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextObject";
import { Login, Logout, Me, Register } from "../services/api";
import type { AuthUser } from "../types/AuthUser";
import type { LoginPayload } from "../types/Login";
import type { RegisterPayload } from "../types/Register";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const data = await Me();
      setUser(data.user);
    } catch (error) {
      console.error("Failed to refresh authenticated user:", error);
      setUser(null);
    }
  }

  async function login(payload: LoginPayload) {
    await Login(payload);
    await refreshUser();
  }

  async function register(payload: RegisterPayload) {
    await Register(payload);
  }

  async function logout() {
    await Logout();
    setUser(null);
  }

  useEffect(() => {
    async function init() {
      await refreshUser();
      setLoading(false);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
