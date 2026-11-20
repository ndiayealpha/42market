import { FEATURE_FLAGS } from "@/src/config/feature-flags";
import { routes } from "@/src/lib/routing/routes";

import type { HeaderActionConfig, HeaderLocation, NavigationItemConfig } from "./Header.types";

/**
 * Config-driven navigation/actions — the only place these change. "Bon
 * plans" and "Nouvel arrivage" are wired to their real, already-built
 * pages. "Précommandes" is omitted while `FEATURE_FLAGS.precommandesEnabled`
 * is off (no real persistence/payment behind it yet) — add it back here
 * once the flag flips, not before.
 */
export const DEFAULT_NAVIGATION_ITEMS: NavigationItemConfig[] = [
  { label: "Maison", href: routes.main.home },
  { label: "Bon plans", href: routes.main.bonsPlans, suffix: "fire" },
  ...(FEATURE_FLAGS.precommandesEnabled ? [{ label: "Précommandes", href: routes.main.preorders }] : []),
  { label: "Nouvel arrivage", href: routes.main.newArrivals, suffix: "new" },
  {
    label: "Carnet du terroir",
    href: routes.main.carnet,
    suffix: "chevron",
    dropdownItems: [
      { label: "Tous les articles", href: routes.main.carnet },
      { label: "Recettes", href: routes.main.recipes },
    ],
  },
  { label: "Aide et contacts", href: routes.main.contact },
];

/** Favoris/Cabas = marron (le brun foncé de la marque), Notifications = rouge — B6. */
export const DEFAULT_HEADER_ACTIONS: HeaderActionConfig[] = [
  { key: "favorites", icon: "heart", label: "Favoris", href: routes.main.favorites, badgeColor: "brown" },
  { key: "notifications", icon: "bell", label: "Notifications", href: routes.main.notifications, badgeColor: "danger" },
  { key: "basket", icon: "basket", label: "Cabas", href: routes.main.cart, badgeColor: "brown" },
];

export const DEFAULT_LOCATION: HeaderLocation = {
  location: "42000, FR",
  radiusLabel: "Rayon 3 km",
};
