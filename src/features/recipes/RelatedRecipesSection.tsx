import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { formatRecipeCountLabel, type Recipe } from "@/src/domain/recipe";
import { routes } from "@/src/lib/routing/routes";

import { RecipeListingCard } from "./RecipeListingCard";

export interface RelatedRecipesSectionProps {
  recipe: Recipe;
  allRecipes: Recipe[];
}

/** Same region first, then any other recipe — never the current one, never fabricated. */
export function RelatedRecipesSection({ recipe, allRecipes }: RelatedRecipesSectionProps) {
  const others = allRecipes.filter((candidate) => candidate.id !== recipe.id);
  const sameRegion = others.filter((candidate) => candidate.region === recipe.region);
  const rest = others.filter((candidate) => candidate.region !== recipe.region);
  const related = [...sameRegion, ...rest].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-foreground-strong">Vous Aimerez Aussi Cuisiner</h2>
        <ButtonLink href={routes.main.recipes} variant="soft" icon={<Icon name="arrow-right" size={14} />}>
          Découvrir nos {formatRecipeCountLabel(allRecipes.length)}
        </ButtonLink>
      </div>
      <CardGrid columns={3}>
        {related.map((candidate) => (
          <li key={candidate.id}>
            <RecipeListingCard recipe={candidate} />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}
