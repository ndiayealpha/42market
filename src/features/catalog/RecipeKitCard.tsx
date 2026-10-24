"use client";

import { useState } from "react";

import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Button } from "@/src/components/atoms/Button/Button";
import type { RecipeKit } from "@/src/domain/recipe-kit";
import { computeRecipeTotal } from "@/src/domain/recipe-kit";
import { useAddToCart } from "@/src/hooks/useAddToCart";
import { formatPrice } from "@/src/lib/format";

export interface RecipeKitCardProps {
  recipeKit: RecipeKit;
}

/** The one client island on Page A besides favorite/cart buttons — everything else is a Server Component. */
export function RecipeKitCard({ recipeKit }: RecipeKitCardProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set(recipeKit.ingredients.map((ingredient) => ingredient.id)));
  const { addToCart } = useAddToCart();
  const total = computeRecipeTotal(recipeKit.ingredients, checkedIds);

  function toggleIngredient(id: string) {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAddToCart() {
    addToCart(`${total.checkedCount} ingrédients de "${recipeKit.title}"`, total.checkedCount);
  }

  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl bg-surface-subtle p-5 sm:p-6 lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-3">
        <Chip tone="cream" size="sm" className="self-start" uppercase>
          Kit Recette Tout-en-un
        </Chip>
        <h2 className="text-3xl font-light text-foreground-strong">{recipeKit.title}</h2>
        <p className="text-sm text-muted-foreground">{recipeKit.description}</p>
        <div className="mt-2 flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-muted-foreground">Préparation</p>
            <p className="font-semibold text-foreground-strong">{recipeKit.prepMinutes} min</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pour</p>
            <p className="font-semibold text-foreground-strong">{recipeKit.servings} convives</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Prix panier</p>
            <p className="text-xl font-bold text-foreground-strong">{formatPrice(total.totalPrice)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-surface p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-foreground-strong">{total.checkedCount} ingrédients sélectionnés</p>
          <span className="flex items-center gap-1.5 text-xs font-medium text-success">
            <span aria-hidden>●</span>
            {total.allAvailable ? "En stock direct" : "Stock partiel"}
          </span>
        </div>

        <ul role="list" className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {recipeKit.ingredients.map((ingredient, index) => {
            const isLast = index === recipeKit.ingredients.length - 1;
            return (
              <li key={ingredient.id} className={isLast ? "sm:col-span-2" : undefined}>
                <label className={`flex items-center gap-2 text-sm ${ingredient.isAvailable ? "text-foreground-strong" : "text-muted-foreground"}`}>
                  <Checkbox
                    checked={checkedIds.has(ingredient.id)}
                    disabled={!ingredient.isAvailable}
                    onChange={() => toggleIngredient(ingredient.id)}
                  />
                  <span>
                    {ingredient.label}
                    {!ingredient.isAvailable && <span className="ml-1 font-semibold text-danger">Indisponible</span>}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-catalog-line pt-4">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="check-circle" size={14} className="text-success" decorative />
            Portions équilibrées par l&apos;artisan
          </p>
          <Button
            variant="primary-md"
            icon={<Icon name="basket" size={16} decorative />}
            disabled={total.checkedCount === 0}
            onClick={handleAddToCart}
          >
            Ajouter la recette • {formatPrice(total.totalPrice)}
          </Button>
        </div>
      </div>
    </div>
  );
}
