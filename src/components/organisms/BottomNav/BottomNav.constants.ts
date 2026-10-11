import type { IconName } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

export interface BottomNavTabConfig {
  key: string;
  label: string;
  icon: IconName;
  href: string;
}

export const BOTTOM_NAV_TABS: BottomNavTabConfig[] = [
  { key: "home", label: "Accueil", icon: "home", href: routes.main.home },
  { key: "search", label: "Recherche", icon: "search", href: routes.main.search },
  { key: "recipes", label: "Recettes", icon: "cooking", href: routes.main.recipes },
  { key: "cart", label: "Panier", icon: "basket", href: routes.main.cart },
  { key: "profile", label: "Profil", icon: "user", href: routes.main.profile },
];
