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
    /** Target of "Modifier mon profil" — page not built yet (out of scope for this page), see compte-rendu. */
    profileEdit: "/main/profile/modifier",
    favorites: "/main/favoris",
    /** Target of the home page's "Voir toutes les précommandes" — page not built yet, same category as `profileEdit`. */
    preorders: "/main/precommandes",
    orders: "/main/commandes",
    addresses: "/main/adresses",
    paymentMethods: "/main/paiement",
    /** Alias for `contact` — was the app's one placeholder for every unbuilt "nous contacter" flow (checkout help, order tracking, recipe review/proposal, find-a-store, ...), pointing at a route with no page and a 404 on click. Now resolves to the real Contact page built for this mission instead of staying a second dead string. */
    support: "/main/contact",
    security: "/main/securite",
    settings: "/main/settings",
    search: "/main/recherche",
    recipes: "/main/recettes",
    /** Fiche recette (Page G) — mirrors `epicerieProduit`'s "nested under the listing" pattern. */
    recipeDetail: (slug: string) => `/main/recettes/${slug}`,
    /** Carnet du Terroir hub (Page A) — the editorial/blog landing page. */
    carnet: "/main/carnet-du-terroir",
    /** One dynamic route for every article kind (recette/guide/portrait/anti-gaspi) — the `kind` field on `Article` tells the page which layout pieces to render, not a route per kind. */
    carnetArticle: (slug: string) => `/main/carnet-du-terroir/${slug}`,
    cart: "/main/panier",
    promoDemo: "/main/offres-demo",
    epiceries: "/main/epiceries",
    /** First dynamic route in the app — a function, not a string, since the segment varies per store. */
    epicerieDetail: (slug: string) => `/main/epiceries/${slug}`,
    /** "Tous les rayons" — a `CatalogScope` template, not a page per aisle. */
    epicerieRayons: (slug: string) => `/main/epiceries/${slug}/rayons`,
    epicerieRayon: (slug: string, rayonSlug: string) => `/main/epiceries/${slug}/rayons/${rayonSlug}`,
    epicerieBonsPlans: (slug: string) => `/main/epiceries/${slug}/bons-plans`,
    /** Product detail (Page P) — nested under its store, matching the `epicerieRayon*` family. */
    epicerieProduit: (slug: string, produitSlug: string) => `/main/epiceries/${slug}/produits/${produitSlug}`,
    notifications: "/main/notifications",
    /** Protected, same as `epiceries` — no public-discovery exception needed unless asked for one. */
    newArrivals: "/main/nouveaux-arrivages",
    /** Global, cross-store promotions page — distinct from `epicerieBonsPlans`, which is scoped to one store. */
    bonsPlans: "/main/bons-plans",
    /** Marketing/onboarding content — public like `bonsPlans`, same reasoning (helps convert anonymous visitors). */
    howItWorks: "/main/comment-ca-marche",
    /** Support content, crawlable — public for the same reason as `howItWorks`. */
    faq: "/main/faq",
    /** Click & Collect checkout (Page K) — the step between the cart and order confirmation. */
    checkout: "/main/panier/retrait",
    /** Order confirmation + live tracking (Page S) — one route for both, the status varies. */
    orderDetail: (orderId: string) => `/main/commandes/${orderId}`,
    /** Manifeste Sam & Amadou — marketing content, public like `howItWorks`. */
    about: "/main/a-propos",
    /** Public contact form; accepts `?motif=` and `?epicerie=` to prefill from a deep link. */
    contact: "/main/contact",
    /** Landing + formulaire d'adhésion commerçant — replaces the generic `auth.createAccount` destination used until now by every "devenir commerçant" CTA. */
    merchantOnboarding: "/main/commercants/ouvrir-une-boutique",
    /** Minimal real pages so footer legal links are never "#" — content is a placeholder, see compte-rendu. */
    legalNotice: "/main/mentions-legales",
    privacyPolicy: "/main/politique-de-confidentialite",
    termsOfSale: "/main/cgv",
    cookiePolicy: "/main/gestion-des-cookies",
  },
  api: {
    orderReceipt: (orderId: string) => `/api/orders/${orderId}/receipt`,
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

/**
 * Routes nested under a protected prefix that are nonetheless public (rule
 * 7: "Bons plans par épiceries est publique" — unlike the per-store
 * `epicerieBonsPlans`, which stays behind `verifySession`). Checked before
 * `PROTECTED_PREFIXES` so the `/main` proxy guard (see `proxy.ts` at the
 * repo root) doesn't redirect anonymous visitors away from it.
 */
/**
 * `routes.main.search` (Page R) joins the same exception as `bonsPlans` for
 * the same reason: `proxy.ts` would otherwise redirect anonymous visitors
 * to login before the page ever renders, and both pages are public by
 * design.
 */
const PROTECTED_EXCEPTIONS: string[] = [
  routes.main.bonsPlans,
  routes.main.search,
  routes.main.howItWorks,
  routes.main.faq,
  routes.main.recipes,
  routes.main.carnet,
  routes.main.about,
  routes.main.contact,
  routes.main.merchantOnboarding,
  routes.main.legalNotice,
  routes.main.privacyPolicy,
  routes.main.termsOfSale,
  routes.main.cookiePolicy,
];

/**
 * Pattern-based exceptions, for routes with dynamic segments that are
 * nonetheless public — Page P (fiche produit) is public per spec, same
 * "accessible sans session" rule as `epicerieBonsPlans`, but its segments
 * (store slug, product slug) vary, so a literal `PROTECTED_EXCEPTIONS`
 * entry can't express it. Recipe details and Carnet articles join the same
 * exception for the same discovery/SEO reasoning.
 */
const PROTECTED_EXCEPTION_PATTERNS: RegExp[] = [
  /^\/main\/epiceries\/[^/]+\/produits\/[^/]+\/?$/,
  /^\/main\/recettes\/[^/]+\/?$/,
  /^\/main\/carnet-du-terroir\/[^/]+\/?$/,
  /** `epicerieDetail` itself — its `/bons-plans` sibling stays protected (no discovery need asked for it yet). */
  /^\/main\/epiceries\/[^/]+\/?$/,
  /** The real catalog grid + kit recette (`/rayons` and `/rayons/:rayon`) — the mission's Page 5 "add to cart from the catalog" journey needs this public, same reasoning as `epicerieProduit`. */
  /^\/main\/epiceries\/[^/]+\/rayons(\/[^/]+)?\/?$/,
  /**
   * The top-level "Toutes les épiceries" listing — exact match only (not a
   * `PROTECTED_EXCEPTIONS` prefix entry, which would also expose the
   * still-protected `epicerieBonsPlans` nested under the same `/main/epiceries/:slug/`
   * path). The discovery funnel's CTAs ("Trouver une épicerie près de chez
   * moi" on À propos/Comment ça marche) need this reachable by anonymous visitors.
   */
  /^\/main\/epiceries\/?$/,
];

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

export function isProtectedRoute(pathname: string): boolean {
  if (PROTECTED_EXCEPTIONS.some((exception) => pathname === exception || pathname.startsWith(`${exception}/`))) {
    return false;
  }
  if (PROTECTED_EXCEPTION_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return false;
  }
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
