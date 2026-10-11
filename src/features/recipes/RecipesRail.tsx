import type { Recipe } from "@/src/domain/recipe";

import { RecipeCard } from "./RecipeCard";

export interface RecipesRailProps {
  recipes: Recipe[];
}

/**
 * A plain scroll-snap rail, not `organisms/Carousel`: that component's
 * gap and prev/next-arrow/pagination-dot system are tuned for
 * `PromoSection`'s variable-width cards — bending it for this section's
 * fixed 275px cards and arrow-less design would risk changing its
 * existing behavior for no shared benefit.
 */
export function RecipesRail({ recipes }: RecipesRailProps) {
  return (
    <div
      role="region"
      aria-label="Recettes du terroir"
      className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul role="list" className="flex w-max gap-5 pt-1 pb-1">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="snap-start">
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}
