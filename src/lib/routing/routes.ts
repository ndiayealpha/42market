/**
 * Single source of truth for every route in the app. Import `routes`
 * instead of writing path strings, so a path only ever changes here.
 */
export const routes = {
  home: "/",
  auth: {
    login: "/auth",
    createAccount: "/auth/create-account",
    onboarding: "/auth/onboarding",
  },
  main: {
    root: "/main",
    home: "/main/home",
    profile: "/main/profile",
    settings: "/main/settings",
    search: "/main/recherche",
    recipes: "/main/recettes",
    cart: "/main/panier",
    promoDemo: "/main/offres-demo",
  },
} as const;

/** Routes reachable without a session. */
const PUBLIC_ROUTES: string[] = [
  routes.home,
  routes.auth.login,
  routes.auth.createAccount,
  routes.auth.onboarding,
];

/** Route prefixes that require a session; everything nested under them too. */
const PROTECTED_PREFIXES: string[] = [routes.main.root];

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/** Builds the login URL, preserving where the user was headed. */
export function buildLoginUrl(callbackUrl?: string | null): string {
  if (!callbackUrl || callbackUrl === routes.auth.login) {
    return routes.auth.login;
  }
  const params = new URLSearchParams({ callbackUrl });
  return `${routes.auth.login}?${params.toString()}`;
}

/**
 * Validates a callback URL before redirecting to it. Only same-site,
 * absolute-path values are accepted, which rules out open-redirect
 * payloads such as `//evil.example.com` or `https://evil.example.com`.
 */
export function resolveCallbackUrl(callbackUrl?: string | null): string {
  if (!callbackUrl) return routes.main.home;
  if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return routes.main.home;
  }
  return callbackUrl;
}
