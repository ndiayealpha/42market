import Link from "next/link";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { formatPromoCountLabel, type StoreDealsSummary } from "@/src/domain/store-deals";

export interface StoreDealsTileProps {
  store: StoreDealsSummary;
  /** The anchor id of this store's `StoreDealsSection`, further down the same page. */
  sectionAnchor: string;
}

/** A rail tile that's an anchor link to its own `StoreDealsSection` below (rule D2: "lien d'ancrage vers la section de sa boutique"). */
export function StoreDealsTile({ store, sectionAnchor }: StoreDealsTileProps) {
  return (
    <Link
      href={`#${sectionAnchor}`}
      className="flex w-[180px] shrink-0 items-center gap-3 rounded-xl bg-surface p-3 shadow-card transition-colors hover:bg-catalog-chip-hover"
    >
      <StoreAvatar name={store.name} slug={store.slug} size={40} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-foreground-strong">{store.name}</span>
        <Chip tone="pink" size="xs" shape="pill" className="mt-1">
          {formatPromoCountLabel(store.promoCount)}
        </Chip>
      </span>
    </Link>
  );
}
