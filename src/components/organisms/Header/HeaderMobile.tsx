"use client";

import Link from "next/link";

import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Logo } from "@/src/components/atoms/Logo/Logo";
import { useCartItemCount } from "@/src/lib/cart/cart.store";
import { routes } from "@/src/lib/routing/routes";

import type { HeaderLocation, HeaderUser } from "./Header.types";

export interface HeaderMobileProps {
  location: HeaderLocation;
  user?: HeaderUser;
  onLocationClick?: () => void;
}

/**
 * The mobile header's single row: compact logo, location pill, basket
 * (sharing its count with BottomNav's "Panier" tab via the cart store),
 * and a connect/account control. Only rendered below the `md` breakpoint
 * — see Header.tsx.
 */
export function HeaderMobile({ location, user, onLocationClick }: HeaderMobileProps) {
  const cartCount = useCartItemCount();

  return (
    <div className="flex h-16 items-center gap-2 px-4">
      <Logo variant="compact" />

      <button
        type="button"
        onClick={onLocationClick}
        className="flex h-11 min-w-0 flex-1 items-center justify-center gap-1 rounded-full bg-surface-subtle px-3 text-xs font-medium text-foreground-strong"
      >
        <Icon name="location" size={14} className="shrink-0" decorative />
        <span className="truncate">
          {location.location} ({location.radiusLabel})
        </span>
        <Icon name="chevron-down" size={12} className="shrink-0" decorative />
      </button>

      <Link
        href={routes.main.cart}
        aria-label="Panier"
        className="relative flex h-11 w-11 shrink-0 items-center justify-center text-foreground-strong"
      >
        <Icon name="basket" size={24} decorative />
        {cartCount > 0 && (
          <span className="absolute right-0.5 top-0.5">
            <Badge variant="count" color="basket">
              {cartCount}
            </Badge>
          </span>
        )}
      </Link>

      {user ? (
        <Link
          href={routes.main.profile}
          aria-label={`Mon compte, ${user.name}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center"
        >
          <Avatar src={user.avatarSrc} name={user.name} size={36} />
        </Link>
      ) : (
        <Link
          href={routes.auth.login}
          aria-label="Connexion"
          className="flex h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-strong px-3 text-sm font-medium text-foreground-strong [@media(max-width:359px)]:w-11 [@media(max-width:359px)]:px-0"
        >
          <Icon name="log-in" size={18} decorative />
          <span className="[@media(max-width:359px)]:hidden">Connexion</span>
        </Link>
      )}
    </div>
  );
}
