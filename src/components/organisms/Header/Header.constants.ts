import { routes } from "@/src/lib/routing/routes";

import type { HeaderActionConfig, HeaderLocation, NavigationItemConfig } from "./Header.types";

/**
 * Config-driven navigation/actions — the only place these change. Most
 * of these routes (bonnes-affaires, precommandes, ...) don't exist yet;
 * this config is what future pages will plug into, not a claim they do.
 */
export const DEFAULT_NAVIGATION_ITEMS: NavigationItemConfig[] = [
  { label: "Maison", href: routes.main.home },
  { label: "Bonnes Affaires", href: "/main/bonnes-affaires", suffix: "fire" },
  { label: "Précommandes", href: "/main/precommandes" },
  { label: "Nouvel arrivage", href: "/main/nouvel-arrivage", suffix: "new" },
  { label: "Carnet du terroir", href: "/main/carnet-du-terroir", suffix: "chevron" },
  { label: "Aide et contacts", href: "/main/aide-et-contacts" },
];

export const DEFAULT_HEADER_ACTIONS: HeaderActionConfig[] = [
  { key: "favorites", icon: "heart", label: "Favoris", href: "/main/favoris", badgeColor: "favorite" },
  { key: "notifications", icon: "bell", label: "Notifications", href: "/main/notifications", badgeColor: "danger" },
  { key: "basket", icon: "basket", label: "Cabas", href: "/main/cabas", badgeColor: "basket" },
];

export const DEFAULT_LOCATION: HeaderLocation = {
  location: "42000, FR",
  radiusLabel: "Rayon 3 km",
};
