"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AuthSessionUser,
  loginAdmin,
  logoutAdmin,
  changeAdminPassword,
  subscribeToAuthState,
} from "./auth-service";

interface AuthContextType {
  user: AuthSessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: async () => {},
  changePassword: async () => ({ success: false }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuthState((sessionUser) => {
      setUser(sessionUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    const res = await loginAdmin(email, pass);
    if (res.success && res.user) {
      setUser(res.user);
    }
    setLoading(false);
    return res;
  };

  const logout = async () => {
    setLoading(true);
    await logoutAdmin();
    setUser(null);
    setLoading(false);
  };

  const changePassword = async (currentPass: string, newPass: string) => {
    return changeAdminPassword(currentPass, newPass);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
