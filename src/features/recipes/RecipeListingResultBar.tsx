import { Select } from "@/src/components/atoms/Select/Select";
import { RECIPE_SORT_CONFIG, type RecipeSortOption } from "@/src/domain/recipe";

export interface RecipeListingResultBarProps {
  from: number;
  to: number;
  totalCount: number;
  sort: RecipeSortOption;
  onSortChange: (sort: RecipeSortOption) => void;
}

const SORT_OPTIONS = (Object.keys(RECIPE_SORT_CONFIG) as RecipeSortOption[]).map((value) => ({ value, label: RECIPE_SORT_CONFIG[value].label }));

export function RecipeListingResultBar({ from, to, totalCount, sort, onSortChange }: RecipeListingResultBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-ink-muted">
        Affichage de <strong className="font-bold text-foreground-strong">{from}</strong> à <strong className="font-bold text-foreground-strong">{to}</strong> sur{" "}
        <strong className="font-bold text-foreground-strong">{totalCount}</strong> recettes authentiques
      </p>
      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <span>Trier par :</span>
        <Select icon="sort" options={SORT_OPTIONS} value={sort} onChange={onSortChange} aria-label="Trier les recettes" />
      </div>
    </div>
  );
}
