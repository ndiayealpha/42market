import Link from "next/link";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Flag } from "@/src/components/atoms/Flag/Flag";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { getAllIngredientIds, getPrimaryStoreOption, getRecipeBasketTotal, type Recipe } from "@/src/domain/recipe";
import { useFavorites } from "@/src/hooks/useFavorites";
import { formatDistance, formatDuration, formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface RecipeListingCardProps {
  recipe: Recipe;
}

export function RecipeListingCard({ recipe }: RecipeListingCardProps) {
  const { favoriteIds } = useFavorites("recipe");
  const isFavorite = favoriteIds.has(recipe.id);
  const primaryStore = getPrimaryStoreOption(recipe);
  const basketTotal = getRecipeBasketTotal(recipe, primaryStore.storeSlug, getAllIngredientIds(recipe));
  const ingredientCount = recipe.detail.ingredients.length;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
      <ProductImage
        src={recipe.image.src}
        alt={recipe.image.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        topLeft={
          <span className="flex items-center gap-1.5 rounded-full bg-surface/90 px-2 py-1 text-[11px] font-bold text-foreground-strong backdrop-blur-sm">
            <Flag code={recipe.flag} size={12} />
            {recipe.countries[0]}
          </span>
        }
        topRight={
          <FavoriteButton
            itemId={recipe.id}
            isFavorite={isFavorite}
            label={isFavorite ? `Retirer ${recipe.title} des favoris` : `Ajouter ${recipe.title} aux favoris`}
            kind="recipe"
            tone="surface"
          />
        }
        bottomRight={
          <span className="flex items-center gap-1 rounded-full bg-foreground-strong/90 px-2 py-1 text-[11px] font-medium text-white">
            <Icon name="clock" size={12} />
            {formatDuration(recipe.durationMinutes)}
          </span>
        }
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-bold text-foreground-strong">{recipe.title}</h3>
        <p className="line-clamp-2 text-xs text-ink-muted">{recipe.description}</p>

        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="basket" size={14} decorative />
            Panier ({ingredientCount} ingrédients)
          </span>
          <span className="font-bold text-foreground-strong">{formatPrice(basketTotal)}</span>
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="store" size={14} decorative />
          Épicerie{" "}
          <Link href={routes.main.epicerieDetail(primaryStore.storeSlug)} className="relative z-10 font-semibold text-foreground-strong underline underline-offset-2">
            {primaryStore.storeName}
          </Link>
          <span>· {formatDistance(primaryStore.distanceMeters)}</span>
        </p>

        <ButtonLink href={routes.main.recipeDetail(recipe.slug)} variant="primary-md" className="relative z-10 mt-auto w-full justify-center">
          Voir la recette &amp; panier
        </ButtonLink>
      </div>
    </div>
  );
}
