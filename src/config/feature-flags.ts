/**
 * Static feature flags — no remote config/experimentation system exists in
 * this app, so flipping one means editing this file and shipping it.
 */
export const FEATURE_FLAGS = {
  /** Home delivery is announced as "Bientôt disponible" (FAQ) — the badge/option stays hidden everywhere until this flips, even for stores that already carry a `deliversToHome` flag in their fixture. */
  homeDelivery: false,
  /** Reservation flow has no real payment/persistence yet (see `group-preorders.repository.ts`'s `reserve()`) — hidden from the menu, the home section and every "Précommander" CTA, and the route itself, until that's built. Code stays in place for the next brique. */
  precommandesEnabled: false,
  /** The home countdown banner ("Temps restant" / "profiter maintenant") — disabled pending client validation of its copy/behavior. */
  countdownEnabled: false,
  /** The header's location/radius picker — re-enabled 2026-11-19 at the client's explicit request (address + radius must be editable again). */
  locationPickerEnabled: true,
} as const;
