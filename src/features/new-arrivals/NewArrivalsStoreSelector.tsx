import Link from "next/link";

import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { formatNewArrivalCountLabel, getNewArrivalsAnchorId, type NewArrivalSection } from "@/src/domain/new-arrival";

export interface NewArrivalsStoreSelectorProps {
  sections: NewArrivalSection[];
}

/** Anchor-link tiles to each section below — same mechanism as `StoreDealsTile` (no scroll-spy "active" tracking: this repo has no precedent for it anywhere, so the tile is a pure nav link, not a stateful toggle). */
export function NewArrivalsStoreSelector({ sections }: NewArrivalsStoreSelectorProps) {
  return (
    <ul role="list" className="flex gap-3 overflow-x-auto pb-1">
      {sections.map((section) => {
        const anchorId = getNewArrivalsAnchorId(section.stores.map((store) => store.slug));
        const name = section.stores.map((store) => store.name).join(" & ");
        return (
          <li key={anchorId} className="shrink-0">
            <Link
              href={`#${anchorId}`}
              className="flex w-[160px] flex-col items-center gap-2 rounded-xl bg-surface p-3 text-center shadow-card transition-colors hover:bg-catalog-chip-hover"
            >
              <span className="flex -space-x-2">
                {section.stores.map((store) => (
                  <StoreAvatar key={store.slug} name={store.name} slug={store.slug} size={40} className="ring-2 ring-surface" />
                ))}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-foreground-strong">{name}</span>
                <span className="block text-xs font-medium text-muted-foreground">{formatNewArrivalCountLabel(section.products.length)}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
