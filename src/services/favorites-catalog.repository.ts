import type { FavoriteProduct, FavoriteRecipe } from "@/src/domain/favorites";
import { FAVORITE_PRODUCTS, FAVORITE_PRODUCTS_RECENT_ORDER, FAVORITE_RECIPES } from "@/src/data/favorites.mock";

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
    return FAVORITE_RECIPES;
  },
  async getRecentOrder() {
    return FAVORITE_PRODUCTS_RECENT_ORDER;
  },
};
