import Link from "next/link";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { FavoriteRecipe } from "@/src/domain/favorites";
import { RECIPE_DIFFICULTY_CONFIG } from "@/src/domain/recipe";
import { useFavorites } from "@/src/hooks/useFavorites";
import { formatDuration, formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface FavoriteRecipeCardProps {
  recipe: FavoriteRecipe;
}

/** F6 (minimal, unmaquetted at first, now matching the Recettes-tab maquette) — a compact recipe card; `RecipeKitCard` (Page A) is built around an ingredient checklist, not a fit for "a recipe I favorited", so this stays its own card. */
export function FavoriteRecipeCard({ recipe }: FavoriteRecipeCardProps) {
  const { favoriteIds } = useFavorites("recipe");
  const isFavorite = favoriteIds.has(recipe.id);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
      <ProductImage
        src={recipe.image.src}
        alt={recipe.image.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1024px) 25vw, 50vw"
        topRight={
          <FavoriteButton
            itemId={recipe.id}
            isFavorite={isFavorite}
            label={isFavorite ? `Retirer ${recipe.name} des favoris` : `Ajouter ${recipe.name} aux favoris`}
            kind="recipe"
            tone="surface"
            className="relative z-10"
          />
        }
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="line-clamp-2 text-base font-bold text-foreground-strong">
          <Link href={recipe.href} className="after:absolute after:inset-0">
            {recipe.name}
          </Link>
        </p>

        <div className="flex items-center gap-2">
          <Link href={routes.main.epicerieDetail(recipe.storeSlug)} className="relative z-10">
            <Chip tone="cream" size="xs">
              {recipe.storeName}
            </Chip>
          </Link>
          <span className="text-xs font-bold text-foreground-strong">Dès {formatPrice(recipe.totalPrice)}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="clock" size={14} decorative />
            {formatDuration(recipe.durationMinutes)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="user" size={14} decorative />
            {recipe.servings} pers.
          </span>
          <span>{RECIPE_DIFFICULTY_CONFIG[recipe.difficulty].label}</span>
        </div>

        <ButtonLink href={recipe.href} variant="soft" className="relative z-10 mt-auto w-full justify-center border border-catalog-line">
          Voir la recette
        </ButtonLink>
      </div>
    </div>
  );
}
