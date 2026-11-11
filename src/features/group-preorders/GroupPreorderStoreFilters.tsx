import Link from "next/link";

import { formatCampaignCountLabel, type GroupPreorderStoreOption } from "@/src/domain/group-preorder";

export interface GroupPreorderStoreFiltersProps {
  options: GroupPreorderStoreOption[];
  selectedStoreSlug: string | null;
  buildHref: (storeSlug: string | null) => string;
}

/** Single-select toggle: clicking the active chip again clears the store filter (same "click to clear" UX as the per-store bons-plans scope chips). */
export function GroupPreorderStoreFilters({ options, selectedStoreSlug, buildHref }: GroupPreorderStoreFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">Épiceries partenaires :</span>
      {options.map((option) => {
        const isActive = selectedStoreSlug === option.slug;
        return (
          <Link
            key={option.slug}
            href={buildHref(isActive ? null : option.slug)}
            aria-current={isActive ? "true" : undefined}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
              isActive ? "text-foreground-strong underline underline-offset-2" : "text-ink-muted hover:text-foreground-strong"
            }`}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-catalog-success" />
            {option.name} <span className="font-normal">({option.neighborhood})</span> · {formatCampaignCountLabel(option.campaignCount)}
          </Link>
        );
      })}
    </div>
  );
}
