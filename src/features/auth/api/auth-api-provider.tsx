"use client";

import { createContext, useContext, type ReactNode } from "react";

import { authApi, type AuthApi } from "./auth.api";

const AuthApiContext = createContext<AuthApi | null>(null);

export interface AuthApiProviderProps {
  children: ReactNode;
  /** Dependency injection seam — the real client in the app, `auth.api.mock.ts` in Storybook/tests. */
  api?: AuthApi;
}

export function AuthApiProvider({ children, api = authApi }: AuthApiProviderProps) {
  return <AuthApiContext.Provider value={api}>{children}</AuthApiContext.Provider>;
}

export function useAuthApi(): AuthApi {
  const context = useContext(AuthApiContext);
  if (!context) {
    throw new Error("useAuthApi must be used within an AuthApiProvider");
  }
  return context;
}
