import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import type { NewArrivalCategory } from "@/src/domain/new-arrival";
import { routes } from "@/src/lib/routing/routes";

export interface NewArrivalCategoryFiltersProps {
  categories: NewArrivalCategory[];
  activeCategorySlug: string;
  totalCount: number;
}

/** URL-driven category chips (real `<Link>`s via `FilterChip`, never client-only state) — same convention as the per-store bons-plans page's type chips. */
export function NewArrivalCategoryFilters({ categories, activeCategorySlug, totalCount }: NewArrivalCategoryFiltersProps) {
  return (
    <ul role="list" className="flex gap-2 overflow-x-auto pb-1">
      <li>
        <FilterChip href={routes.main.newArrivals} label={`Tous (${totalCount})`} isActive={activeCategorySlug === "all"} />
      </li>
      {categories.map((category) => (
        <li key={category.slug}>
          <FilterChip
            href={`${routes.main.newArrivals}?categorie=${category.slug}`}
            label={category.label}
            isActive={activeCategorySlug === category.slug}
          />
        </li>
      ))}
    </ul>
  );
}
