import { routes } from "@/src/lib/routing/routes";

import type { HeaderActionConfig, HeaderLocation, NavigationItemConfig } from "./Header.types";

/**
 * Config-driven navigation/actions — the only place these change. Most
 * of these routes (precommandes, ...) don't exist yet; this config is
 * what future pages will plug into, not a claim they do. "Bon plans" and
 * "Nouvel arrivage" are wired to their real, already-built pages (both
 * were previously hardcoded to different, nonexistent paths).
 */
export const DEFAULT_NAVIGATION_ITEMS: NavigationItemConfig[] = [
  { label: "Maison", href: routes.main.home },
  { label: "Bon plans", href: routes.main.bonsPlans, suffix: "fire" },
  { label: "Précommandes", href: routes.main.preorders },
  { label: "Nouvel arrivage", href: routes.main.newArrivals, suffix: "new" },
  { label: "Carnet du terroir", href: "/main/carnet-du-terroir", suffix: "chevron" },
  { label: "Aide et contacts", href: "/main/aide-et-contacts" },
];

export const DEFAULT_HEADER_ACTIONS: HeaderActionConfig[] = [
  { key: "favorites", icon: "heart", label: "Favoris", href: routes.main.favorites, badgeColor: "favorite" },
  { key: "notifications", icon: "bell", label: "Notifications", href: routes.main.notifications, badgeColor: "danger" },
  { key: "basket", icon: "basket", label: "Cabas", href: routes.main.cart, badgeColor: "basket" },
];

export const DEFAULT_LOCATION: HeaderLocation = {
  location: "42000, FR",
  radiusLabel: "Rayon 3 km",
};
