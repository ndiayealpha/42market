import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Section } from "@/src/components/layout/Section/Section";
import { RECIPES } from "@/src/data/recipes.mock";
import { formatRecipeCountLabel } from "@/src/domain/recipe";
import { routes } from "@/src/lib/routing/routes";

import { RecipesRail } from "./RecipesRail";

export function RecipesSection() {
  return (
    <Section
      id="recipes"
      title="Les recettes du terroir à cuisiner chez vous"
      action={
        <ButtonLink href={routes.main.recipes} variant="soft" icon={<Icon name="arrow-right" size={16} />}>
          Voir tout ({formatRecipeCountLabel(RECIPES.length)})
        </ButtonLink>
      }
    >
      <RecipesRail recipes={RECIPES} />
    </Section>
  );
}
