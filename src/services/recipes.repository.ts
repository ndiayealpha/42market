import { RECIPES, RECIPES_RECENT_ORDER } from "@/src/data/recipes.mock";
import type { Recipe } from "@/src/domain/recipe";

export interface RecipesRepository {
  list(): Promise<Recipe[]>;
  getBySlug(slug: string): Promise<Recipe | null>;
  getRecentOrder(): Promise<string[]>;
}

export const mockRecipesRepository: RecipesRepository = {
  async list() {
    return RECIPES;
  },
  async getBySlug(slug) {
    return RECIPES.find((recipe) => recipe.slug === slug) ?? null;
  },
  async getRecentOrder() {
    return RECIPES_RECENT_ORDER;
  },
};
