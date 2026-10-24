import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import { StoreMultiSelect } from "@/src/components/molecules/StoreMultiSelect/StoreMultiSelect";
import type { Category } from "@/src/domain/store-merchandising";
import type { PromoFilterType, PromoScopeOption } from "@/src/domain/promotions";
import { PROMO_FILTER_TYPE_CONFIG } from "@/src/domain/promotions";
import { routes } from "@/src/lib/routing/routes";

export interface PromoFilterBarProps {
  storeSlug: string;
  activeType: PromoFilterType;
  activeAisleId?: string;
  aisles: Category[];
  scopeOptions: PromoScopeOption[];
  selectedScopeSlugs: string[];
  onScopeChange: (slugs: string[]) => void;
  primaryStoreName: string;
}

const FILTER_TYPES: PromoFilterType[] = ["all", "flash", "multibuy", "anti-gaspi", "discovery"];

function buildHref(storeSlug: string, params: { type?: PromoFilterType; rayon?: string }): string {
  const search = new URLSearchParams();
  if (params.type && params.type !== "all") search.set("type", params.type);
  if (params.rayon) search.set("rayon", params.rayon);
  const query = search.toString();
  return query ? `${routes.main.epicerieBonsPlans(storeSlug)}?${query}` : routes.main.epicerieBonsPlans(storeSlug);
}

/** Two independent facets, both URL-driven (rule: "des filtres d'URL... pas du filtrage client"): promo type (row 1) and rayon (row 2) — plus the multi-store scope popover. */
export function PromoFilterBar({
  storeSlug,
  activeType,
  activeAisleId,
  aisles,
  scopeOptions,
  selectedScopeSlugs,
  onScopeChange,
  primaryStoreName,
}: PromoFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-surface-subtle p-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_TYPES.map((type) => {
          const config = PROMO_FILTER_TYPE_CONFIG[type];
          return (
            <FilterChip
              key={type}
              href={buildHref(storeSlug, { type, rayon: activeAisleId })}
              label={config.label}
              icon={config.icon}
              isActive={type === activeType}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {aisles
            .filter((aisle) => aisle.variant !== "deals")
            .map((aisle) => (
              <FilterChip
                key={aisle.id}
                href={buildHref(storeSlug, { type: activeType, rayon: aisle.id })}
                label={aisle.promoSectionTitle ?? aisle.label}
                isActive={aisle.id === activeAisleId}
                size="compact"
              />
            ))}
        </div>

        <StoreMultiSelect
          options={scopeOptions}
          selectedSlugs={selectedScopeSlugs}
          onChange={onScopeChange}
          primaryStoreName={primaryStoreName}
        />
      </div>
    </div>
  );
}
