import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";
import { Section } from "@/src/components/layout/Section/Section";
import { RECIPES } from "@/src/data/recipes.mock";
import { routes } from "@/src/lib/routing/routes";

import { RecipesRail } from "./RecipesRail";

export function RecipesSection() {
  return (
    <Section
      id="recipes"
      eyebrow={
        // This section's surtitre is 11px, one size below the Eyebrow
        // default (13px, shared with the stores/preorders sections) —
        // a one-off override rather than a new size variant.
        <Eyebrow className="!text-[11px] !tracking-[0.04em]">
          Inspiration culinaire du terroir · De la recette au panier
        </Eyebrow>
      }
      title="Les recettes du terroir à cuisiner chez vous"
      action={
        <ButtonLink href={routes.main.recipes} variant="soft" icon={<Icon name="arrow-right" size={16} />}>
          Voir tout (15+)
        </ButtonLink>
      }
    >
      <RecipesRail recipes={RECIPES} />
    </Section>
  );
}
