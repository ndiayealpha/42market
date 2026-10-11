/**
 * Query key factory — the single place a signup-related TanStack Query
 * key is spelled out. Nothing outside this file writes `["auth", ...]`
 * literally.
 */
export const authKeys = {
  all: ["auth"] as const,
  countries: () => [...authKeys.all, "countries"] as const,
  me: () => [...authKeys.all, "me"] as const,
};
