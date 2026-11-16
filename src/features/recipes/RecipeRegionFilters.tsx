import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import type { RecipeRegionCount } from "@/src/domain/recipe";
import type { TerroirRegionSlug } from "@/src/domain/terroir";

export interface RecipeRegionFiltersProps {
  counts: RecipeRegionCount[];
  activeRegion: TerroirRegionSlug | "all";
  buildHref: (region: TerroirRegionSlug | "all") => string;
}

export function RecipeRegionFilters({ counts, activeRegion, buildHref }: RecipeRegionFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {counts.map((entry) => (
        <FilterChip key={entry.region} href={buildHref(entry.region)} label={`${entry.label} (${entry.count})`} isActive={activeRegion === entry.region} />
      ))}
    </div>
  );
}
