/**
 * Public, CLIENT-SAFE API of the `auth` feature. Everything outside
 * `features/auth/` — pages and the handful of pre-existing generic
 * components that show session state (UserMenu, main-nav,
 * dashboard/profile/settings views) — imports from here, never from a
 * path under `features/auth/**` directly.
 *
 * Server-only pieces (`getCurrentUser`, `getSession`, `defaultAuthClient`,
 * which pull in `next/headers`/`node:crypto`) live in `./server` instead
 * of here: mixing them into this barrel would break every Client
 * Component that imports it, the same problem `session-provider.tsx`'s
 * own top-of-file comment already calls out for `defaultAuthClient`.
 */
export { SessionProvider, useSession } from "./hooks/session-provider";
export type { SessionProviderProps } from "./hooks/session-provider";

export type { AuthClient } from "./api/auth-client";
export type { AuthResult, Credentials, SessionUser } from "./types/session.types";

export { LoginPage } from "./components/LoginPage/LoginPage";
export { SignupPage } from "./components/SignupPage/SignupPage";

export { AuthApiProvider } from "./api/auth-api-provider";
export type { AuthApiProviderProps } from "./api/auth-api-provider";
export type { AuthApi } from "./api/auth.api";
