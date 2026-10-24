import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import { Select } from "@/src/components/atoms/Select/Select";
import { SEARCH_SORT_CONFIG, type SearchSortOption } from "@/src/domain/search";

const SORT_OPTIONS = (Object.keys(SEARCH_SORT_CONFIG) as SearchSortOption[]).map((value) => ({
  value,
  label: SEARCH_SORT_CONFIG[value].label,
}));

export interface SearchFilterBarOverrides {
  pickupWithin2h?: boolean;
  promoOnly?: boolean;
  bulkOnly?: boolean;
  storeSlug?: string;
}

export interface SearchFilterBarProps {
  pickupWithin2h: boolean;
  promoOnly: boolean;
  bulkOnly: boolean;
  storeSlug: string;
  sort: SearchSortOption;
  /** Count of every store currently in the result set — the "Toutes les épicerie" chip's own `{n}`. */
  totalStoresCount: number;
  /** Indicative only — see `parsePickupMinutes`'s doc comment for why this doesn't match exact filtering. */
  pickupWithin2hCount: number;
  buildHref: (overrides: SearchFilterBarOverrides) => string;
  onSortChange: (sort: SearchSortOption) => void;
}

/** R3 — URL-driven filter chips (never client-only state) plus the sort `Select`, same `buildHref(overrides)` idiom as `FavoritesView`/`NotificationsView`. */
export function SearchFilterBar({
  pickupWithin2h,
  promoOnly,
  bulkOnly,
  storeSlug,
  sort,
  totalStoresCount,
  pickupWithin2hCount,
  buildHref,
  onSortChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap gap-2">
        <FilterChip href={buildHref({ storeSlug: "all" })} label={`Toutes les épicerie ${totalStoresCount}`} isActive={storeSlug === "all"} />
        <FilterChip
          href={buildHref({ pickupWithin2h: !pickupWithin2h })}
          icon="zap"
          label={`Retrait < 2h ${pickupWithin2hCount}`}
          isActive={pickupWithin2h}
        />
        <FilterChip href={buildHref({ promoOnly: !promoOnly })} icon="tag" label="Promo en cours" isActive={promoOnly} />
        <FilterChip href={buildHref({ bulkOnly: !bulkOnly })} icon="package" label="Gros / Carton (+10kg)" isActive={bulkOnly} />
      </div>
      <Select icon="sort" options={SORT_OPTIONS} value={sort} onChange={onSortChange} aria-label="Trier les résultats" className="ml-auto" />
    </div>
  );
}
