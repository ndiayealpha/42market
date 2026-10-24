"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";
import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Select } from "@/src/components/atoms/Select/Select";
import { Switch } from "@/src/components/atoms/Switch/Switch";
import { Card } from "@/src/components/atoms/Card/Card";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import { SearchInput } from "@/src/components/molecules/SearchInput/SearchInput";
import { FAVORITES_SORT_CONFIG, type FavoritesSortOption } from "@/src/domain/favorites";
import { TERROIR_REGION_CONFIG, type TerroirRegionSlug } from "@/src/domain/terroir";

export interface FavoritesToolbarProps {
  sort: FavoritesSortOption;
  onSortChange: (sort: FavoritesSortOption) => void;
  terroirRegion: TerroirRegionSlug | "all";
  getTerroirHref: (region: TerroirRegionSlug | "all") => string;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  storeOptions: { slug: string; name: string }[];
  selectedStoreSlugs: string[];
  onStoreSlugsChange: (slugs: string[]) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onResetFilters: () => void;
}

const SORT_OPTIONS = (Object.keys(FAVORITES_SORT_CONFIG) as FavoritesSortOption[]).map((value) => ({
  value,
  label: FAVORITES_SORT_CONFIG[value].label,
}));

const TERROIR_OPTIONS: { value: TerroirRegionSlug | "all"; label: string }[] = [
  { value: "all", label: "Tous les terroirs" },
  ...(Object.keys(TERROIR_REGION_CONFIG) as TerroirRegionSlug[]).map((value) => ({ value, label: TERROIR_REGION_CONFIG[value].label })),
];

/** F3 — sort, advanced-filter panel (Dialog), terroir chips and a debounced search, all URL-driven. */
export function FavoritesToolbar({
  sort,
  onSortChange,
  terroirRegion,
  getTerroirHref,
  inStockOnly,
  onInStockOnlyChange,
  storeOptions,
  selectedStoreSlugs,
  onStoreSlugsChange,
  query,
  onQueryChange,
  onResetFilters,
}: FavoritesToolbarProps) {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const hasAdvancedFilters = inStockOnly || selectedStoreSlugs.length > 0;

  function toggleStore(slug: string) {
    const next = selectedStoreSlugs.includes(slug) ? selectedStoreSlugs.filter((value) => value !== slug) : [...selectedStoreSlugs, slug];
    onStoreSlugsChange(next);
  }

  return (
    <Card variant="elevated" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Select icon="sort" options={SORT_OPTIONS} value={sort} onChange={onSortChange} aria-label="Trier mes favoris" />

        <span className="relative inline-flex">
          <Button variant="soft" icon={<Icon name="sliders" size={16} decorative />} onClick={() => setFilterOpen(true)}>
            Filtrer
          </Button>
          {hasAdvancedFilters && <span aria-hidden className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-danger" />}
        </span>

        <div className="flex flex-wrap gap-2">
          {TERROIR_OPTIONS.map((option) => (
            <FilterChip key={option.value} href={getTerroirHref(option.value)} label={option.label} isActive={terroirRegion === option.value} />
          ))}
        </div>

        <SearchInput
          defaultValue={query}
          onDebouncedChange={onQueryChange}
          label="Filtrer parmi mes favoris"
          placeholder="Filtrer parmi mes favoris…"
          className="ml-auto w-full sm:w-64"
        />
      </div>

      <Dialog open={isFilterOpen} onClose={() => setFilterOpen(false)} title="Filtres avancés">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground-strong">En stock uniquement</span>
            <Switch checked={inStockOnly} onChange={onInStockOnlyChange} aria-label="N'afficher que les favoris en stock" />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground-strong">Boutiques</p>
            <ul role="list" className="flex flex-col gap-2">
              {storeOptions.map((option) => (
                <li key={option.slug}>
                  <label className="flex items-center gap-2 text-sm text-foreground-strong">
                    <Checkbox checked={selectedStoreSlugs.includes(option.slug)} onChange={() => toggleStore(option.slug)} />
                    {option.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="soft"
            onClick={() => {
              onResetFilters();
              setFilterOpen(false);
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      </Dialog>
    </Card>
  );
}
