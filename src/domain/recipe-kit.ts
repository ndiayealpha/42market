import type { Media } from "@/src/domain/store-merchandising";

export interface RecipeKitIngredient {
  id: string;
  label: string;
  price: number;
  isAvailable: boolean;
}

export interface RecipeKit {
  id: string;
  title: string;
  description: string;
  prepMinutes: number;
  servings: number;
  ingredients: RecipeKitIngredient[];
  image: Media;
}

export interface RecipeTotal {
  totalPrice: number;
  checkedCount: number;
  /** True only when every ingredient in the kit (not just the checked ones) is available — drives "En stock direct" vs "Stock partiel". */
  allAvailable: boolean;
}

/** Pure: price/count/availability from the kit + which ingredient ids are checked — never reads component state directly. */
export function computeRecipeTotal(ingredients: RecipeKitIngredient[], checkedIds: ReadonlySet<string>): RecipeTotal {
  const checked = ingredients.filter((ingredient) => checkedIds.has(ingredient.id));
  return {
    totalPrice: checked.reduce((sum, ingredient) => sum + ingredient.price, 0),
    checkedCount: checked.length,
    allAvailable: ingredients.every((ingredient) => ingredient.isAvailable),
  };
}
