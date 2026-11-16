import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import type { ArticleKind, ArticleKindCount } from "@/src/domain/article";

export interface ArticleKindFiltersProps {
  counts: ArticleKindCount[];
  activeKind: ArticleKind | "all";
  buildHref: (kind: ArticleKind | "all") => string;
}

export function ArticleKindFilters({ counts, activeKind, buildHref }: ArticleKindFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {counts.map((entry) => (
        <FilterChip key={entry.kind} href={buildHref(entry.kind)} label={`${entry.label} (${entry.count})`} isActive={activeKind === entry.kind} />
      ))}
    </div>
  );
}
