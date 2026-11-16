import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { formatRecipeCountLabel } from "@/src/domain/recipe";
import { routes } from "@/src/lib/routing/routes";

export interface RecipesListingHeroProps {
  totalCount: number;
}

export function RecipesListingHero({ totalCount }: RecipesListingHeroProps) {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Recettes du Terroir", href: routes.main.recipes },
          { label: "Toutes les recettes" },
        ]}
      />
      <Chip tone="cream" size="sm" shape="pill" uppercase className="w-fit font-bold">
        Savoir-faire artisanal &amp; épiceries locales
      </Chip>
      <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Le Carnet Culinaire des Terroirs du Monde</h1>
      <p className="max-w-3xl text-sm text-ink-muted sm:text-base">
        {formatRecipeCountLabel(totalCount)} traditionnelles et secrètes transmises par nos familles et chefs partenaires. Chaque recette pré-remplit
        votre panier Click &amp; Collect auprès de vos épiceries de quartier.
      </p>
    </div>
  );
}
