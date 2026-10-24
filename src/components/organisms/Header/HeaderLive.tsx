"use client";

import { usePathname, useRouter } from "next/navigation";

import { useFavorites } from "@/src/hooks/useFavorites";
import { useUnreadNotificationsCount } from "@/src/hooks/useNotificationCounts";
import { useCartItemCount } from "@/src/lib/cart/cart.store";
import { routes } from "@/src/lib/routing/routes";

import { DEFAULT_HEADER_ACTIONS } from "./Header.constants";
import { Header, type HeaderProps } from "./Header";

/**
 * Wraps `Header` with the live counts/active-state its 3 action badges need
 * (Favoris, Notifications, Cabas) — `Header` itself stays a pure,
 * prop-driven component (unaffected, still directly storyable); only
 * `app/main/layout.tsx` needs to know this wrapper exists.
 *
 * Also wires `HeaderSearch`'s own `onSearch` (previously a dead prop — no
 * page instantiated it) to a real navigation to Page R. Minimal, additive
 * change: `Header`/`HeaderTop`/`HeaderSearch` already threaded `onSearch`
 * all the way down, so only this client boundary (which already has
 * `useRouter` available) needed a default handler — a caller can still
 * override it via its own `onSearch` prop (`props.onSearch ?? handleSearch`).
 */
export function HeaderLive(props: Omit<HeaderProps, "actions">) {
  const pathname = usePathname();
  const router = useRouter();
  const { favoriteIds } = useFavorites("product");
  const unreadNotificationsCount = useUnreadNotificationsCount();
  const cartCount = useCartItemCount();

  const counts: Record<string, number> = {
    favorites: favoriteIds.size,
    notifications: unreadNotificationsCount,
    basket: cartCount,
  };

  const actions = DEFAULT_HEADER_ACTIONS.map((action) => ({
    ...action,
    count: counts[action.key],
    isActive: pathname === action.href,
  }));

  function handleSearch(query: string) {
    router.push(`${routes.main.search}?q=${encodeURIComponent(query)}`);
  }

  return <Header {...props} actions={actions} onSearch={props.onSearch ?? handleSearch} />;
}
