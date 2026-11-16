import type { FlagCode } from "@/src/components/atoms/Flag/Flag";
import type { Media } from "@/src/domain/store-merchandising";
import { TERROIR_REGION_CONFIG, type TerroirRegionSlug } from "@/src/domain/terroir";
import { foldAccents } from "@/src/lib/text";

export type RecipeDifficulty = "facile" | "moyen" | "difficile";

export const RECIPE_DIFFICULTY_CONFIG: Record<RecipeDifficulty, { label: string }> = {
  facile: { label: "Facile" },
  moyen: { label: "Moyen" },
  difficile: { label: "Difficile" },
};

export interface RecipeStoreOption {
  storeSlug: string;
  storeName: string;
  distanceMeters: number;
  pickupMinutes: number;
}

export interface RecipeIngredientStorePrice {
  storeSlug: string;
  price: number;
  isAvailable: boolean;
}

export interface RecipeIngredient {
  id: string;
  label: string;
  quantityLabel: string;
  prices: RecipeIngredientStorePrice[];
}

export interface RecipeStep {
  order: number;
  title: string;
  description: string;
  durationLabel?: string;
}

export interface RecipeReview {
  id: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  comment: string;
  createdAtIso: string;
}

export interface RecipeDetail {
  chefTipAuthor: string;
  chefTip: string;
  pairingTip?: string;
  equipmentTip?: string;
  substitutionTip?: string;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
  reviews: RecipeReview[];
  storeOptions: RecipeStoreOption[];
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  countries: string[];
  flag: FlagCode;
  region: TerroirRegionSlug;
  durationMinutes: number;
  servings: number;
  difficulty: RecipeDifficulty;
  description: string;
  image: Media;
  originTag?: string;
  originBadge?: string;
  detail: RecipeDetail;
}

/** The ingredient total at a given store for whichever ingredients are checked — the one place a recipe basket price is computed, never read from a fixture field. */
export function getRecipeBasketTotal(recipe: Recipe, storeSlug: string, checkedIds: Set<string>): number {
  const checked = recipe.detail.ingredients.filter((ingredient) => checkedIds.has(ingredient.id));
  return checked.reduce((sum, ingredient) => {
    const price = ingredient.prices.find((p) => p.storeSlug === storeSlug);
    return sum + (price?.price ?? 0);
  }, 0);
}

/** Every ingredient id, present at every store by default — the starting selection before a visitor unchecks a pantry staple. */
export function getAllIngredientIds(recipe: Recipe): Set<string> {
  return new Set(recipe.detail.ingredients.map((ingredient) => ingredient.id));
}

/** The default/primary store — the first option, used for card pricing and the fiche's initial selection. */
export function getPrimaryStoreOption(recipe: Recipe): RecipeStoreOption {
  return recipe.detail.storeOptions[0];
}

/** The card/listing "Panier dès" price — the full ingredient list at the primary store. */
export function getRecipeStartingPrice(recipe: Recipe): number {
  return getRecipeBasketTotal(recipe, getPrimaryStoreOption(recipe).storeSlug, getAllIngredientIds(recipe));
}

/** Average rounded to 1 decimal + count — always derived from the real reviews, never a fixture field (rule: aucune note codée en dur). */
export function getRecipeRating(recipe: Recipe): { average: number; count: number } | null {
  const { reviews } = recipe.detail;
  if (reviews.length === 0) return null;
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return { average: Math.round(average * 10) / 10, count: reviews.length };
}

export type RecipeSortOption = "popular" | "recent" | "duration-asc" | "price-asc";

export const RECIPE_SORT_CONFIG: Record<RecipeSortOption, { label: string }> = {
  popular: { label: "Plus populaires" },
  recent: { label: "Plus récentes" },
  "duration-asc": { label: "Temps de préparation" },
  "price-asc": { label: "Prix croissant" },
};

/** `recentOrder` is the ids in "most recently published" order (index 0 = most recent) — can't be derived from `Recipe` fields alone, same convention as `sortFavoriteProducts`. */
export function sortRecipes(recipes: Recipe[], sort: RecipeSortOption, recentOrder: string[]): Recipe[] {
  const sorted = [...recipes];
  switch (sort) {
    case "popular":
      return sorted.sort((a, b) => (getRecipeRating(b)?.average ?? 0) - (getRecipeRating(a)?.average ?? 0));
    case "recent":
      return sorted.sort((a, b) => recentOrder.indexOf(a.id) - recentOrder.indexOf(b.id));
    case "duration-asc":
      return sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case "price-asc":
      return sorted.sort((a, b) => getRecipeStartingPrice(a) - getRecipeStartingPrice(b));
    default: {
      const exhaustive: never = sort;
      throw new Error(`Unhandled recipe sort: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export function filterRecipesByRegion(recipes: Recipe[], region: TerroirRegionSlug | "all"): Recipe[] {
  if (region === "all") return recipes;
  return recipes.filter((recipe) => recipe.region === region);
}

export interface RecipeRegionCount {
  region: TerroirRegionSlug | "all";
  label: string;
  count: number;
}

/** "Tous les Terroirs" plus one entry per region that actually has at least one recipe — never a chip for an empty region (same rule as every other filter-chip row in this app). */
export function getRecipeRegionCounts(recipes: Recipe[]): RecipeRegionCount[] {
  const regions = (Object.keys(TERROIR_REGION_CONFIG) as TerroirRegionSlug[])
    .map((region) => ({ region, label: TERROIR_REGION_CONFIG[region].label, count: filterRecipesByRegion(recipes, region).length }))
    .filter((entry) => entry.count > 0);
  return [{ region: "all" as const, label: "Tous les Terroirs", count: recipes.length }, ...regions];
}

export function parseRecipeSort(value: string | string[] | undefined): RecipeSortOption {
  const candidates: RecipeSortOption[] = ["popular", "recent", "duration-asc", "price-asc"];
  return candidates.includes(value as RecipeSortOption) ? (value as RecipeSortOption) : "popular";
}

export function parseRecipeRegionFilter(value: string | string[] | undefined, regions: TerroirRegionSlug[]): TerroirRegionSlug | "all" {
  return typeof value === "string" && regions.includes(value as TerroirRegionSlug) ? (value as TerroirRegionSlug) : "all";
}

const RECIPE_PAGE_SIZE = 12;

export function paginateRecipes(recipes: Recipe[], page: number): { items: Recipe[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(recipes.length / RECIPE_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * RECIPE_PAGE_SIZE;
  return { items: recipes.slice(start, start + RECIPE_PAGE_SIZE), totalPages };
}

export function parseRecipePage(value: string | string[] | undefined): number {
  const parsed = typeof value === "string" ? Number.parseInt(value, 10) : NaN;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

/** "48 recettes" / "1 recette" — fr-FR treats 0 as plural, same convention as `formatStoreCountLabel`. */
export function formatRecipeCountLabel(count: number): string {
  return count === 1 ? "1 recette" : `${count} recettes`;
}

/** Mirrors `searchArticles`' pattern (title + description substring) — used by the global search page to cross-link a query to a matching recipe. Accent-folded both sides so "thieboudienne" matches "Thiéboudienne". */
export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const normalized = foldAccents(query.trim());
  if (!normalized) return recipes;
  return recipes.filter((recipe) => foldAccents(recipe.title).includes(normalized) || foldAccents(recipe.description).includes(normalized));
}

export interface RecipeJsonLdInput {
  recipe: Recipe;
  canonicalUrl: string;
}

/** Mirrors `buildProductJsonLd`'s shape/escaping exactly (same `</script>`-injection guard). */
export function buildRecipeJsonLd({ recipe, canonicalUrl }: RecipeJsonLdInput): string {
  const rating = getRecipeRating(recipe);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: recipe.image.src ? [recipe.image.src] : [],
    description: recipe.description,
    recipeCuisine: recipe.countries.join(", "),
    recipeYield: `${recipe.servings} portions`,
    totalTime: `PT${recipe.durationMinutes}M`,
    recipeIngredient: recipe.detail.ingredients.map((ingredient) => `${ingredient.label} (${ingredient.quantityLabel})`),
    recipeInstructions: recipe.detail.steps.map((step) => ({ "@type": "HowToStep", name: step.title, text: step.description })),
    url: canonicalUrl,
    ...(rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: rating.average, reviewCount: rating.count } } : {}),
  };
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}
