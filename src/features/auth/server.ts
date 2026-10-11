/**
 * Public, SERVER-ONLY API of the `auth` feature (Server Components,
 * Server Actions, `proxy.ts`). Kept separate from `./index.ts` — see
 * that file's comment — so a Client Component can never accidentally
 * pull in `next/headers` by importing the feature's barrel.
 */
export { defaultAuthClient } from "./api/auth-client";
export { getCurrentUser, verifySession } from "./api/dal";
export { getSession } from "./api/session";
