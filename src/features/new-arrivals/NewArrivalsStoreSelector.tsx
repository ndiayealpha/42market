import Link from "next/link";

import { StoreAvatarGroup } from "@/src/components/molecules/StoreAvatarGroup/StoreAvatarGroup";
import { formatNewArrivalCountLabel, getNewArrivalsAnchorId, type NewArrivalSection } from "@/src/domain/new-arrival";

export interface NewArrivalsStoreSelectorProps {
  sections: NewArrivalSection[];
}

/**
 * Anchor-link tiles to each section below — same mechanism as
 * `StoreDealsTile` (no scroll-spy "active" tracking: this repo has no
 * precedent for it anywhere, so the tile is a pure nav link, not a
 * stateful toggle). `flex-col items-center` only centers each child at
 * its own content width (cross-axis sizing, not a stretch), so the title
 * needs its own `w-full` or a combined name ("Nimba Market & Elikya
 * Market") renders at its unconstrained natural width and overflows the
 * fixed-width card instead of wrapping/clamping inside it.
 */
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
              className="flex w-[160px] min-w-0 flex-col items-center gap-2 overflow-hidden rounded-xl bg-surface p-3 text-center shadow-card transition-colors hover:bg-catalog-chip-hover"
            >
              <StoreAvatarGroup stores={section.stores} size={48} />
              {/* min-height reserves space for the worst case (2-line title + the count line below it), so a 1-line card's row stays the same height as a 2-line one. */}
              <span className="flex w-full min-h-[60px] flex-col items-center justify-center">
                <span className="line-clamp-2 w-full text-sm font-bold text-foreground-strong [overflow-wrap:anywhere]">{name}</span>
                <span className="mt-0.5 block text-xs font-medium text-muted-foreground">{formatNewArrivalCountLabel(section.products.length)}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
