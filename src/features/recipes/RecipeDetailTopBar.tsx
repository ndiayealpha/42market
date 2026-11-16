"use client";

import Link from "next/link";

import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { useFavorites } from "@/src/hooks/useFavorites";
import { routes } from "@/src/lib/routing/routes";
import { useToast } from "@/src/providers/toast-provider";

export interface RecipeDetailTopBarProps {
  recipeId: string;
  recipeTitle: string;
}

export function RecipeDetailTopBar({ recipeId, recipeTitle }: RecipeDetailTopBarProps) {
  const { favoriteIds } = useFavorites("recipe");
  const toast = useToast();
  const isFavorite = favoriteIds.has(recipeId);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.show("Lien de la recette copié.", "success");
    } catch {
      toast.show("Impossible de copier le lien.", "error");
    }
  }

  return (
    <div className="flex items-center justify-between">
      <Link href={routes.main.recipes} className="flex items-center gap-1.5 text-sm font-semibold text-foreground-strong">
        <Icon name="chevron-left" size={16} decorative />
        Toutes les recettes
      </Link>
      <div className="flex items-center gap-2">
        <FavoriteButton
          itemId={recipeId}
          isFavorite={isFavorite}
          label={isFavorite ? `Retirer ${recipeTitle} des favoris` : `Ajouter ${recipeTitle} aux favoris`}
          kind="recipe"
          tone="solid"
        />
        <button
          type="button"
          aria-label="Partager cette recette"
          onClick={handleShare}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-catalog-chip"
        >
          <Icon name="share" size={16} className="text-foreground-strong" decorative />
        </button>
      </div>
    </div>
  );
}
