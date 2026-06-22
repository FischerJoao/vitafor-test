import { createContext } from "react";
import type { AuthUser } from "../types/AuthUser";
import type { LoginPayload } from "../types/Login";
import type { RegisterPayload } from "../types/Register";

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
