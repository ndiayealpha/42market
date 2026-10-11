"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * One QueryClient per browser tab (not per render): created lazily in
 * `useState` so it survives re-renders but never leaks between requests
 * on the server. Generic app-wide infra — not auth-specific — so it
 * lives here rather than inside a feature.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
