import Link from "next/link";

import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { FavoriteRecipe } from "@/src/domain/favorites";
import { useFavorites } from "@/src/hooks/useFavorites";
import { formatPrice } from "@/src/lib/format";

export interface FavoriteRecipeCardProps {
  recipe: FavoriteRecipe;
}

/** F6 (minimal, unmaquetted) — a compact recipe card; `RecipeKitCard` (Page A) is built around an ingredient checklist, not a fit for "a recipe I favorited", so this is a new, smaller card (rule 5/12: derive from tokens, flagged). */
export function FavoriteRecipeCard({ recipe }: FavoriteRecipeCardProps) {
  const { favoriteIds } = useFavorites("recipe");
  const isFavorite = favoriteIds.has(recipe.id);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
      <ProductImage
        src={recipe.image.src}
        alt={recipe.image.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1024px) 33vw, 100vw"
        topRight={
          <FavoriteButton
            itemId={recipe.id}
            isFavorite={isFavorite}
            label={isFavorite ? `Retirer ${recipe.name} des favoris` : `Ajouter ${recipe.name} aux favoris`}
            kind="recipe"
            className="relative z-10"
          />
        }
      />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-base font-bold text-foreground-strong">
          <Link href={recipe.href} className="after:absolute after:inset-0">
            {recipe.name}
          </Link>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{recipe.servings} pers.</p>
        <p className="mt-auto pt-3 text-sm font-bold text-foreground-strong">Panier dès {formatPrice(recipe.totalPrice)}</p>
      </div>
    </div>
  );
}
