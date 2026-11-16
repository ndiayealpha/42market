import type { FavoriteProduct, FavoriteRecipe } from "@/src/domain/favorites";
import { FAVORITE_PRODUCTS, FAVORITE_PRODUCTS_RECENT_ORDER } from "@/src/data/favorites.mock";
import { RECIPES } from "@/src/data/recipes.mock";
import { getPrimaryStoreOption, getRecipeStartingPrice, type Recipe } from "@/src/domain/recipe";
import { routes } from "@/src/lib/routing/routes";

/** Derives the Favoris-tab shape from the single canonical `Recipe` catalog — no separate hardcoded recipe fixture, so a favorited recipe can never drift from its real price/route. */
function toFavoriteRecipe(recipe: Recipe): FavoriteRecipe {
  const primaryStore = getPrimaryStoreOption(recipe);
  return {
    id: recipe.id,
    name: recipe.title,
    servings: recipe.servings,
    totalPrice: getRecipeStartingPrice(recipe),
    image: recipe.image,
    href: routes.main.recipeDetail(recipe.slug),
    storeSlug: primaryStore.storeSlug,
    storeName: primaryStore.storeName,
    durationMinutes: recipe.durationMinutes,
    difficulty: recipe.difficulty,
    terroirRegion: recipe.region,
  };
}

/**
 * The catalog of favoritable products/recipes — distinct from
 * `favorites.repository`, which only tracks WHICH ids are favorited per
 * kind. The Favoris page joins the two: favorited ids (favorites.repository)
 * ∩ this catalog = what actually renders.
 */
export interface FavoritesCatalogRepository {
  getFavoriteProductsCatalog(): Promise<FavoriteProduct[]>;
  getFavoriteRecipesCatalog(): Promise<FavoriteRecipe[]>;
  getRecentOrder(): Promise<string[]>;
}

export const mockFavoritesCatalogRepository: FavoritesCatalogRepository = {
  async getFavoriteProductsCatalog() {
    return FAVORITE_PRODUCTS;
  },
  async getFavoriteRecipesCatalog() {
    return RECIPES.map(toFavoriteRecipe);
  },
  async getRecentOrder() {
    return FAVORITE_PRODUCTS_RECENT_ORDER;
  },
};
