import { NextResponse, type NextRequest } from "next/server";

import {
  buildLoginUrl,
  isProtectedRoute,
  isPublicRoute,
  resolveCallbackUrl,
} from "@/src/lib/routing/routes";
import { getSession } from "@/src/features/auth/server";

/**
 * Optimistic, cookie-only auth check that runs before every route.
 * This is the first line of defense (fast, no DB access); each
 * protected page still calls `verifySession` from the DAL, which is
 * the check that actually protects the data (see docs/guides/authentication).
 */
export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const user = await getSession();

  if (isProtectedRoute(pathname) && !user) {
    const callbackUrl = `${pathname}${search}`;
    return NextResponse.redirect(new URL(buildLoginUrl(callbackUrl), request.url));
  }

  if (isPublicRoute(pathname) && pathname !== "/" && user) {
    return NextResponse.redirect(new URL(resolveCallbackUrl(null), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico)$).*)",
  ],
};
