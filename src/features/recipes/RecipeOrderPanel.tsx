"use client";

import { useMemo, useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Card } from "@/src/components/atoms/Card/Card";
import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { QuantityStepper } from "@/src/components/atoms/QuantityStepper/QuantityStepper";
import { Select } from "@/src/components/atoms/Select/Select";
import { getAllIngredientIds, getPrimaryStoreOption, type Recipe } from "@/src/domain/recipe";
import { useAddRecipeToCart } from "@/src/hooks/useAddRecipeToCart";
import { formatDistance, formatPrice } from "@/src/lib/format";

export interface RecipeOrderPanelProps {
  recipe: Recipe;
}

const MAX_SERVINGS = 12;

export function RecipeOrderPanel({ recipe }: RecipeOrderPanelProps) {
  const primaryStore = getPrimaryStoreOption(recipe);
  const [storeSlug, setStoreSlug] = useState(primaryStore.storeSlug);
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => getAllIngredientIds(recipe));
  const { addRecipeToCart, dialog } = useAddRecipeToCart();

  const store = recipe.detail.storeOptions.find((option) => option.storeSlug === storeSlug) ?? primaryStore;
  const scale = servings / recipe.servings;

  const rows = useMemo(
    () =>
      recipe.detail.ingredients.map((ingredient) => {
        const priceAtStore = ingredient.prices.find((p) => p.storeSlug === storeSlug);
        return {
          ingredient,
          isAvailable: priceAtStore?.isAvailable ?? false,
          scaledPrice: (priceAtStore?.price ?? 0) * scale,
        };
      }),
    [recipe.detail.ingredients, storeSlug, scale]
  );

  const availableRows = rows.filter((row) => row.isAvailable);
  const checkedRows = availableRows.filter((row) => checkedIds.has(row.ingredient.id));
  const subtotal = checkedRows.reduce((sum, row) => sum + row.scaledPrice, 0);

  function toggleIngredient(id: string) {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAddToCart() {
    addRecipeToCart({
      storeSlug: store.storeSlug,
      storeName: store.storeName,
      items: checkedRows.map((row) => ({
        id: row.ingredient.id,
        name: row.ingredient.label,
        packagingLabel: row.ingredient.quantityLabel,
        price: Math.round(row.scaledPrice * 100) / 100,
        image: recipe.image,
      })),
    });
  }

  return (
    <Card variant="elevated" className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-muted-foreground">
            <Icon name="basket" size={14} /> Épicerie partenaire locale
          </p>
          <p className="text-lg font-extrabold text-foreground-strong">
            Panier Recette · {servings} Personne{servings > 1 ? "s" : ""}
          </p>
        </div>
        <QuantityStepper value={servings} max={MAX_SERVINGS} onChange={setServings} />
      </div>

      <Select
        icon="store"
        options={recipe.detail.storeOptions.map((option) => ({
          value: option.storeSlug,
          label: `${option.storeName} – ${formatDistance(option.distanceMeters)}`,
        }))}
        value={storeSlug}
        onChange={setStoreSlug}
        aria-label="Choisir l'épicerie pour ce panier recette"
        className="w-full"
      />
      <p className="flex items-center gap-1.5 text-xs text-success">
        <Icon name="zap" size={14} />
        Click &amp; Collect garanti {store.pickupMinutes} min · Retrait gratuit 0€
      </p>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        {rows.map(({ ingredient, isAvailable, scaledPrice }) => (
          <label key={ingredient.id} className={`flex items-center gap-3 ${isAvailable ? "" : "opacity-50"}`}>
            <Checkbox checked={isAvailable && checkedIds.has(ingredient.id)} disabled={!isAvailable} onChange={() => toggleIngredient(ingredient.id)} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground-strong">{ingredient.label}</span>
              <span className="block text-xs text-muted-foreground">{isAvailable ? ingredient.quantityLabel : "Indisponible chez cette épicerie"}</span>
            </span>
            <span className="shrink-0 text-sm font-bold text-foreground-strong">{isAvailable ? formatPrice(scaledPrice) : "—"}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
        <p className="text-muted-foreground">
          {checkedRows.length} sur {availableRows.length} ingrédients
        </p>
        <p className="text-lg font-extrabold text-foreground-strong">{formatPrice(subtotal)}</p>
      </div>

      <Button variant="primary-lg" onClick={handleAddToCart} disabled={checkedRows.length === 0}>
        Ajouter au panier ({formatPrice(subtotal)})
      </Button>
      {dialog}
    </Card>
  );
}
