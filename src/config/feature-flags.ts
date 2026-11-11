/**
 * Static feature flags — no remote config/experimentation system exists in
 * this app, so flipping one means editing this file and shipping it.
 */
export const FEATURE_FLAGS = {
  /** Home delivery is announced as "Bientôt disponible" (FAQ) — the badge/option stays hidden everywhere until this flips, even for stores that already carry a `deliversToHome` flag in their fixture. */
  homeDelivery: false,
} as const;
