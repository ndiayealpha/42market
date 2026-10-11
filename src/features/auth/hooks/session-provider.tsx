"use client";

import { createContext, useContext, useState, useTransition, type ReactNode } from "react";

import type { Credentials, SessionUser } from "@/src/features/auth/types/session.types";
// Type-only: importing the concrete `defaultAuthClient` here would pull
// server actions (and their node:crypto/next/headers dependencies) into
// every bundle that renders a SessionProvider, including Storybook's.
// Callers provide the concrete client explicitly (see app/layout.tsx and
// .storybook/preview.tsx).
import type { AuthClient } from "@/src/features/auth/api/auth-client";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface SessionContextValue {
  user: SessionUser | null;
  status: SessionStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials, callbackUrl?: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export interface SessionProviderProps {
  children: ReactNode;
  /** The session resolved server-side for the initial render (or null). */
  initialUser: SessionUser | null;
  /** Storybook/tests only: force a status regardless of `initialUser`. */
  initialStatus?: SessionStatus;
  /** Dependency injection seam — pass the real client in the app, a mock in Storybook/tests. */
  authClient: AuthClient;
}

export function SessionProvider({
  children,
  initialUser,
  initialStatus,
  authClient,
}: SessionProviderProps) {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const status: SessionStatus =
    initialStatus ?? (isPending ? "loading" : user ? "authenticated" : "unauthenticated");

  function login(credentials: Credentials, callbackUrl?: string) {
    setError(null);
    startTransition(async () => {
      // On success this calls redirect() under the hood, which Next.js
      // turns into a client-side navigation from inside this transition.
      const outcome = await authClient.login(credentials, callbackUrl);
      if (outcome?.error) setError(outcome.error);
      else if (outcome?.user) setUser(outcome.user);
    });
  }

  function logout() {
    startTransition(async () => {
      await authClient.logout();
      setUser(null);
    });
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        status,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
        error,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
