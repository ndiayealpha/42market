import { Container } from "@/src/components/layout/Container/Container";
import type { Recipe } from "@/src/domain/recipe";

import { RecipeDetailTopBar } from "./RecipeDetailTopBar";
import { RecipeHero } from "./RecipeHero";
import { RecipeMetaTips } from "./RecipeMetaTips";
import { RecipeOrderPanel } from "./RecipeOrderPanel";
import { RecipeReviewsSection } from "./RecipeReviewsSection";
import { RecipeStepsSection } from "./RecipeStepsSection";
import { RecipeSubstitutionTip } from "./RecipeSubstitutionTip";
import { RelatedRecipesSection } from "./RelatedRecipesSection";

export interface RecipeDetailTemplateProps {
  recipe: Recipe;
  allRecipes: Recipe[];
  now: Date;
}

export function RecipeDetailTemplate({ recipe, allRecipes, now }: RecipeDetailTemplateProps) {
  return (
    <Container className="flex flex-col gap-6 py-6">
      <RecipeDetailTopBar recipeId={recipe.id} recipeTitle={recipe.title} />
      <RecipeHero recipe={recipe} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <RecipeMetaTips recipe={recipe} />
          <RecipeStepsSection steps={recipe.detail.steps} />
          {recipe.detail.substitutionTip && <RecipeSubstitutionTip tip={recipe.detail.substitutionTip} />}
          <RecipeReviewsSection recipe={recipe} now={now} />
        </div>
        <div>
          <RecipeOrderPanel recipe={recipe} />
        </div>
      </div>

      <RelatedRecipesSection recipe={recipe} allRecipes={allRecipes} />
    </Container>
  );
}
