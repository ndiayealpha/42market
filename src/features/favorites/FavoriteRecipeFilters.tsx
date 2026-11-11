import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import { TERROIR_REGION_CONFIG, type TerroirRegionSlug } from "@/src/domain/terroir";

export interface FavoriteRecipeFiltersProps {
  terroirRegion: TerroirRegionSlug | "all";
  getTerroirHref: (region: TerroirRegionSlug | "all") => string;
}

/** Shorter chip wording than the canonical `TERROIR_REGION_CONFIG` label ("Caraïbes & Océan Indien") — the maquette's Recettes-tab chip reads "Antilles". Same slug everywhere (no parallel taxonomy), just a display override local to this one row of chips. */
const CHIP_LABEL_OVERRIDES: Partial<Record<TerroirRegionSlug, string>> = {
  "caraibes-ocean-indien": "Antilles",
};

const TERROIR_OPTIONS: { value: TerroirRegionSlug | "all"; label: string }[] = [
  { value: "all", label: "Tous les terroirs" },
  ...(Object.keys(TERROIR_REGION_CONFIG) as TerroirRegionSlug[]).map((value) => ({
    value,
    label: CHIP_LABEL_OVERRIDES[value] ?? TERROIR_REGION_CONFIG[value].label,
  })),
];

export function FavoriteRecipeFilters({ terroirRegion, getTerroirHref }: FavoriteRecipeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TERROIR_OPTIONS.map((option) => (
        <FilterChip key={option.value} href={getTerroirHref(option.value)} label={option.label} isActive={terroirRegion === option.value} />
      ))}
    </div>
  );
}
