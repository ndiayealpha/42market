import { InfoTile } from "@/src/components/molecules/InfoTile/InfoTile";
import { TrustItem } from "@/src/components/molecules/TrustItem/TrustItem";
import type { TrustItemConfig } from "@/src/components/organisms/Footer/Footer.types";

export interface ReassuranceBandProps {
  items: TrustItemConfig[];
  /** "inline": the footer's own row style (Page A, reused as-is — same component, same divider rule). "cards": a rose banner of white icon-tile cards (Page B). */
  variant: "inline" | "cards";
}

/**
 * `variant="inline"` is exactly the footer's existing trust bar markup
 * (same `TrustItem`, same dividers) — not a second component, just reused
 * here between two rules instead of just above the footer's own copy.
 * `variant="cards"` is the one genuinely new layout.
 */
export function ReassuranceBand({ items, variant }: ReassuranceBandProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-6 border-y border-border py-4 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-border">
        {items.map((item) => (
          <div key={item.title} className="sm:flex-1 sm:px-6 first:sm:pl-0 last:sm:pr-0">
            <TrustItem {...item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface-subtle p-4 sm:p-6">
      <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.title}>
            <InfoTile icon={item.icon} title={item.title} subtitle={item.description} layout="card-stacked" />
          </li>
        ))}
      </ul>
    </div>
  );
}
