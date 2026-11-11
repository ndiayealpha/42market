import { SegmentedControl } from "@/src/components/atoms/SegmentedControl/SegmentedControl";
import { Select } from "@/src/components/atoms/Select/Select";
import { Switch } from "@/src/components/atoms/Switch/Switch";
import { STORE_LISTING_SORT_OPTIONS, type StoreListingFilters as StoreListingFiltersValue, type StoreListingSort } from "@/src/domain/store-listing";

export type StoreListingViewMode = "grid" | "map";

const ALL_NEIGHBORHOODS_VALUE = "all";

const VIEW_OPTIONS: { value: StoreListingViewMode; label: string }[] = [
  { value: "grid", label: "Grille" },
  { value: "map", label: "Carte" },
];

const TOGGLES: { key: "openNow" | "quickPickup" | "activePromosOnly"; label: string }[] = [
  { key: "openNow", label: "Ouvert maintenant" },
  { key: "quickPickup", label: "Retrait < 15 min" },
  { key: "activePromosOnly", label: "Promos actives" },
];

export interface StoreListingFiltersProps {
  neighborhoods: string[];
  filters: StoreListingFiltersValue;
  sort: StoreListingSort;
  view: StoreListingViewMode;
  onNeighborhoodChange: (neighborhood: string | null) => void;
  onToggleChange: (key: "openNow" | "quickPickup" | "activePromosOnly", value: boolean) => void;
  onSortChange: (sort: StoreListingSort) => void;
  onViewChange: (view: StoreListingViewMode) => void;
}

/** The filter bar above the store grid — every control is URL-driven (the page reloads its data on change), never client-side-only state. */
export function StoreListingFilters({
  neighborhoods,
  filters,
  sort,
  view,
  onNeighborhoodChange,
  onToggleChange,
  onSortChange,
  onViewChange,
}: StoreListingFiltersProps) {
  const neighborhoodOptions = [
    { value: ALL_NEIGHBORHOODS_VALUE, label: `Tous les quartiers (${neighborhoods.length})` },
    ...neighborhoods.map((neighborhood) => ({ value: neighborhood, label: neighborhood })),
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          icon="location"
          aria-label="Filtrer par quartier"
          value={filters.neighborhood ?? ALL_NEIGHBORHOODS_VALUE}
          onChange={(value) => onNeighborhoodChange(value === ALL_NEIGHBORHOODS_VALUE ? null : value)}
          options={neighborhoodOptions}
        />

        {TOGGLES.map((toggle) => (
          <label key={toggle.key} className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground-strong">
            <Switch aria-label={toggle.label} checked={filters[toggle.key]} onChange={(checked) => onToggleChange(toggle.key, checked)} />
            {toggle.label}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Select icon="sort" aria-label="Trier les épiceries" value={sort} onChange={onSortChange} options={STORE_LISTING_SORT_OPTIONS} />
        <SegmentedControl ariaLabel="Mode d'affichage" value={view} onChange={onViewChange} options={VIEW_OPTIONS} />
      </div>
    </div>
  );
}
