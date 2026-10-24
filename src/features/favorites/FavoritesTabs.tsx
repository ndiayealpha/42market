import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { FavoritesCounts, FavoritesTab } from "@/src/domain/favorites";
import { formatRelativeTime } from "@/src/lib/format";

export interface FavoritesTabsProps {
  active: FavoritesTab;
  counts: FavoritesCounts;
  getTabHref: (tab: FavoritesTab) => string;
  lastSyncedAtIso: string;
  now: Date;
}

const TABS: { tab: FavoritesTab; label: string }[] = [
  { tab: "produits", label: "Produits" },
  { tab: "epiceries", label: "Épiceries" },
  { tab: "recettes", label: "Recettes" },
];

function countFor(tab: FavoritesTab, counts: FavoritesCounts): number {
  if (tab === "produits") return counts.products;
  if (tab === "epiceries") return counts.stores;
  return counts.recipes;
}

/** F2 — plain links in a `<nav>` with `aria-current` (rule 10's documented fallback: no generic `Tabs` component exists yet). */
export function FavoritesTabs({ active, counts, getTabHref, lastSyncedAtIso, now }: FavoritesTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <nav aria-label="Favoris" className="flex items-center gap-6">
        {TABS.map(({ tab, label }) => {
          const isActive = tab === active;
          const count = countFor(tab, counts);
          return (
            <Link
              key={tab}
              href={getTabHref(tab)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-1.5 border-b-2 pb-2 text-[22px] font-bold transition-colors ${
                isActive ? "border-foreground-strong text-foreground-strong" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              <span className={isActive ? "text-foreground-strong" : "text-muted-foreground"}>{count}</span>
            </Link>
          );
        })}
      </nav>

      {active === "produits" && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="refresh" size={14} decorative />
          Stocks synchronisés <time dateTime={lastSyncedAtIso}>{formatRelativeTime(lastSyncedAtIso, now)}</time>
        </p>
      )}
    </div>
  );
}
