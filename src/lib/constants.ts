/**
 * Small app-wide constants that don't belong to any one domain module —
 * kept here instead of duplicated at each call site.
 */

/** The app's one VAT rate, applied to every Click & Collect total (the minimal Panier page and Page K share it — rule: pas de calcul dupliqué). */
export const VAT_RATE_PERCENT = 5.5;

/**
 * The one fixed demo order `placeOrder` always resolves to (see
 * `checkout.repository.ts`) — Page S is keyed to this exact id.
 */
export const DEMO_CLAIMABLE_ORDER_ID = "cmd-4289";

/**
 * Cookie `/api/checkout/claim-order` sets after confirming an order, read
 * back by Page S's ownership check. Needed because `placeOrder` (client-
 * side) and Page S (a Server Component) don't reliably share the same
 * in-memory copy of `order-tracking.repository.ts`'s mock store across
 * Next.js's Route-Handler/Server-Component boundary — a real HTTP cookie
 * does, so it's the actual source of truth for "who just claimed the demo
 * order," not the in-memory `ownerUserId` mutation (kept too, for whatever
 * it's worth when the boundary happens not to apply).
 */
export const DEMO_ORDER_OWNER_COOKIE = "demo-order-owner";
