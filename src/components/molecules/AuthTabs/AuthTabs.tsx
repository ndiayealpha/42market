"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: routes.auth.login, label: "Se connecter", icon: "log-in" },
  { href: routes.auth.createAccount, label: "Créer un compte", icon: "user-plus" },
];

/** Segmented control switching between the login and create-account routes. */
export function AuthTabs() {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      aria-label="Authentification"
      className="flex h-[clamp(40px,5vh,48px)] items-center rounded-[10px] bg-auth-tab-bg p-1"
    >
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] px-4 py-2 text-center text-sm transition-colors ${
              isActive
                ? "bg-white font-semibold text-auth-ink shadow-[0_1px_3px_rgba(58,34,32,0.08)]"
                : "font-normal text-auth-ink-muted hover:text-auth-ink"
            }`}
          >
            <Icon name={tab.icon} size={16} decorative />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
