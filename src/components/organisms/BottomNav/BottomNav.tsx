"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { useSession } from "@/src/features/auth";
import { useCartItemCount } from "@/src/lib/cart/cart.store";
import { routes } from "@/src/lib/routing/routes";

import { BOTTOM_NAV_TABS } from "./BottomNav.constants";

/**
 * There is no web API for "is the on-screen keyboard open" — the common
 * heuristic (used here) is tracking whether a text-entry element
 * currently has focus, which is what actually triggers it on mobile.
 */
function useIsTextInputFocused(): boolean {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function isTextEntry(target: EventTarget | null): boolean {
      if (!(target instanceof HTMLElement)) return false;
      return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
    }

    function handleFocusIn(event: FocusEvent) {
      if (isTextEntry(event.target)) setFocused(true);
    }
    function handleFocusOut(event: FocusEvent) {
      if (isTextEntry(event.target)) setFocused(false);
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return focused;
}

/**
 * Floating fixed-bottom tab bar, mobile only (`md:hidden`). Shares the
 * cart count with the mobile header's basket icon via the same store,
 * and hides itself while a text field is focused so the on-screen
 * keyboard doesn't fight it for space.
 */
export function BottomNav() {
  const pathname = usePathname();
  const cartCount = useCartItemCount();
  const session = useSession();
  const keyboardLikelyOpen = useIsTextInputFocused();

  return (
    <nav
      aria-label="Navigation principale mobile"
      className={`fixed inset-x-0 bottom-0 z-40 rounded-t-3xl bg-surface shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-200 pb-[env(safe-area-inset-bottom)] md:hidden ${
        keyboardLikelyOpen ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex h-[72px] items-stretch justify-around px-1">
        {BOTTOM_NAV_TABS.map((tab) => {
          const href = tab.key === "profile" && !session.user ? routes.auth.login : tab.href;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.key}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-11 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                isActive ? "text-foreground-strong" : "text-muted-foreground"
              }`}
            >
              <span className="relative inline-flex">
                <Icon name={tab.icon} size={24} decorative />
                {tab.key === "cart" && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1.5">
                    <Badge variant="count" color="basket">
                      {cartCount}
                    </Badge>
                  </span>
                )}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
