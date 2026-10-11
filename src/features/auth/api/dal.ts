import { cache } from "react";
import { redirect } from "next/navigation";

import { buildLoginUrl } from "@/src/lib/routing/routes";
import { getSession } from "./session";
import type { SessionUser } from "../types/session.types";

/**
 * Data Access Layer: the one place that reads the session. Memoized per
 * request with React's `cache`, so calling it from a layout and again
 * from a page costs a single cookie read/verify.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  return getSession();
});

/**
 * Use in protected Server Components. Redirects to the login page with
 * a `callbackUrl` when there is no valid session; otherwise returns the
 * user. Do the same close to any other sensitive data source — a proxy
 * check alone is not sufficient (see `proxy.ts`).
 */
export async function verifySession(callbackUrl: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(buildLoginUrl(callbackUrl));
  }
  return user;
}
