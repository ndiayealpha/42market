import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";
import type { Recipe } from "@/src/domain/recipe";

export interface ChefTipsSectionProps {
  recipes: Recipe[];
}

/** The 3 tips shown are real recipe-detail content, not standalone copy — one per recipe, never fabricated independently of the data that backs the fiche recette itself. */
export function ChefTipsSection({ recipes }: ChefTipsSectionProps) {
  const tips = recipes.slice(0, 3);
  if (tips.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface-subtle p-6">
      <div>
        <Eyebrow>
          <Icon name="check-circle" size={14} /> Cuisine vivante
        </Eyebrow>
        <h2 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-foreground-strong">Le Top 3 des Secrets de Chefs &amp; Astuces Épiciers</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          Des techniques partagées par nos commerçants partenaires pour réussir vos sauces et cuissons à la perfection.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tips.map((recipe) => (
          <Card key={recipe.id} variant="elevated" className="flex flex-col gap-2">
            <p className="text-sm font-bold text-foreground-strong">{recipe.detail.chefTip}</p>
            <p className="mt-auto text-xs text-muted-foreground">
              Astuce de {recipe.detail.chefTipAuthor} — <span className="font-semibold text-foreground-strong">{recipe.title}</span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
