import { FilterChip } from "@/src/components/atoms/FilterChip/FilterChip";
import { Select } from "@/src/components/atoms/Select/Select";
import { GROUP_PREORDER_SORT_OPTIONS, type GroupPreorderCategory, type GroupPreorderSort } from "@/src/domain/group-preorder";

export interface GroupPreorderCategoryFiltersProps {
  categories: GroupPreorderCategory[];
  activeCategorySlug: string;
  totalCount: number;
  buildHref: (categorySlug: string) => string;
  sort: GroupPreorderSort;
  onSortChange: (sort: GroupPreorderSort) => void;
}

/** Category chips are real URL links (`FilterChip`); sort stays a `<select>` since its own URL write happens via `onSortChange`, not a direct href per option. */
export function GroupPreorderCategoryFilters({
  categories,
  activeCategorySlug,
  totalCount,
  buildHref,
  sort,
  onSortChange,
}: GroupPreorderCategoryFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <ul role="list" className="flex gap-2 overflow-x-auto pb-1">
        <li>
          <FilterChip href={buildHref("all")} label={`Toutes les précommandes (${totalCount})`} isActive={activeCategorySlug === "all"} />
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <FilterChip href={buildHref(category.slug)} label={category.label} isActive={activeCategorySlug === category.slug} />
          </li>
        ))}
      </ul>
      <Select icon="sort" aria-label="Trier les précommandes" value={sort} onChange={onSortChange} options={GROUP_PREORDER_SORT_OPTIONS} />
    </div>
  );
}
