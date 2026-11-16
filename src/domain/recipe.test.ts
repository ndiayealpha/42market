import { describe, expect, it } from "vitest";

import {
  filterRecipesByRegion,
  formatRecipeCountLabel,
  getAllIngredientIds,
  getPrimaryStoreOption,
  getRecipeBasketTotal,
  getRecipeRating,
  getRecipeRegionCounts,
  getRecipeStartingPrice,
  paginateRecipes,
  parseRecipePage,
  parseRecipeRegionFilter,
  parseRecipeSort,
  searchRecipes,
  sortRecipes,
  type Recipe,
} from "./recipe";

function makeRecipe(overrides: Partial<Recipe> = {}): Recipe {
  return {
    id: "r1",
    slug: "r1",
    title: "Recette",
    countries: ["Sénégal"],
    flag: "sn",
    region: "afrique-ouest",
    durationMinutes: 60,
    servings: 4,
    difficulty: "facile",
    description: "Une recette.",
    image: { src: "/x.jpg", alt: "x" },
    detail: {
      chefTipAuthor: "Chef",
      chefTip: "Astuce.",
      storeOptions: [
        { storeSlug: "s1", storeName: "Store 1", distanceMeters: 500, pickupMinutes: 10 },
        { storeSlug: "s2", storeName: "Store 2", distanceMeters: 1000, pickupMinutes: 15 },
      ],
      steps: [{ order: 1, title: "Étape 1", description: "Faire." }],
      ingredients: [
        { id: "i1", label: "Ingrédient 1", quantityLabel: "1kg", prices: [{ storeSlug: "s1", price: 2, isAvailable: true }, { storeSlug: "s2", price: 2.5, isAvailable: true }] },
        { id: "i2", label: "Ingrédient 2", quantityLabel: "500g", prices: [{ storeSlug: "s1", price: 3, isAvailable: true }, { storeSlug: "s2", price: 0, isAvailable: false }] },
      ],
      reviews: [],
    },
    ...overrides,
  };
}

describe("getRecipeBasketTotal", () => {
  it("sums only the checked ingredients, at the given store", () => {
    const recipe = makeRecipe();
    expect(getRecipeBasketTotal(recipe, "s1", new Set(["i1", "i2"]))).toBe(5);
    expect(getRecipeBasketTotal(recipe, "s1", new Set(["i1"]))).toBe(2);
  });

  it("treats an ingredient with no price at that store as 0", () => {
    const recipe = makeRecipe();
    expect(getRecipeBasketTotal(recipe, "s2", new Set(["i1", "i2"]))).toBe(2.5);
  });
});

describe("getAllIngredientIds / getPrimaryStoreOption / getRecipeStartingPrice", () => {
  it("returns every ingredient id", () => {
    expect(getAllIngredientIds(makeRecipe())).toEqual(new Set(["i1", "i2"]));
  });

  it("returns the first store option as primary", () => {
    expect(getPrimaryStoreOption(makeRecipe()).storeSlug).toBe("s1");
  });

  it("computes the starting price as the full basket at the primary store", () => {
    expect(getRecipeStartingPrice(makeRecipe())).toBe(5);
  });
});

describe("getRecipeRating", () => {
  it("returns null with no reviews", () => {
    expect(getRecipeRating(makeRecipe())).toBeNull();
  });

  it("averages real reviews, rounded to 1 decimal", () => {
    const recipe = makeRecipe({
      detail: {
        ...makeRecipe().detail,
        reviews: [
          { id: "rv1", authorName: "A", rating: 5, comment: "top", createdAtIso: "2026-01-01T00:00:00Z" },
          { id: "rv2", authorName: "B", rating: 4, comment: "bien", createdAtIso: "2026-01-02T00:00:00Z" },
        ],
      },
    });
    expect(getRecipeRating(recipe)).toEqual({ average: 4.5, count: 2 });
  });
});

describe("sortRecipes", () => {
  const fast = makeRecipe({ id: "fast", durationMinutes: 20 });
  const slow = makeRecipe({ id: "slow", durationMinutes: 90 });

  it("sorts by duration ascending", () => {
    expect(sortRecipes([slow, fast], "duration-asc", []).map((r) => r.id)).toEqual(["fast", "slow"]);
  });

  it("sorts by recent order", () => {
    expect(sortRecipes([fast, slow], "recent", ["slow", "fast"]).map((r) => r.id)).toEqual(["slow", "fast"]);
  });
});

describe("filterRecipesByRegion", () => {
  it("returns everything for 'all'", () => {
    expect(filterRecipesByRegion([makeRecipe()], "all")).toHaveLength(1);
  });

  it("filters to the matching region", () => {
    expect(filterRecipesByRegion([makeRecipe({ region: "maghreb" })], "afrique-ouest")).toHaveLength(0);
  });
});

describe("parseRecipeSort / parseRecipeRegionFilter / parseRecipePage", () => {
  it("falls back to defaults on unknown values", () => {
    expect(parseRecipeSort("bogus")).toBe("popular");
    expect(parseRecipeRegionFilter("bogus", ["afrique-ouest"])).toBe("all");
    expect(parseRecipePage("bogus")).toBe(1);
    expect(parseRecipePage("0")).toBe(1);
  });

  it("accepts known values", () => {
    expect(parseRecipeSort("price-asc")).toBe("price-asc");
    expect(parseRecipeRegionFilter("afrique-ouest", ["afrique-ouest"])).toBe("afrique-ouest");
    expect(parseRecipePage("3")).toBe(3);
  });
});

describe("paginateRecipes", () => {
  const recipes = Array.from({ length: 30 }, (_, i) => makeRecipe({ id: `r${i}` }));

  it("returns 12 per page and the right page count", () => {
    const { items, totalPages } = paginateRecipes(recipes, 1);
    expect(items).toHaveLength(12);
    expect(totalPages).toBe(3);
  });

  it("clamps an out-of-range page to the last page", () => {
    const { items } = paginateRecipes(recipes, 99);
    expect(items).toHaveLength(6);
  });
});

describe("formatRecipeCountLabel", () => {
  it("treats 0 as plural, 1 as singular", () => {
    expect(formatRecipeCountLabel(0)).toBe("0 recettes");
    expect(formatRecipeCountLabel(1)).toBe("1 recette");
    expect(formatRecipeCountLabel(8)).toBe("8 recettes");
  });
});

describe("getRecipeRegionCounts", () => {
  it("includes 'all' plus only the regions that have at least one recipe", () => {
    const recipes = [makeRecipe({ id: "a", region: "afrique-ouest" }), makeRecipe({ id: "b", region: "afrique-ouest" }), makeRecipe({ id: "c", region: "maghreb" })];
    const counts = getRecipeRegionCounts(recipes);
    expect(counts).toEqual([
      { region: "all", label: "Tous les Terroirs", count: 3 },
      { region: "afrique-ouest", label: "Afrique de l'Ouest", count: 2 },
      { region: "maghreb", label: "Maghreb", count: 1 },
    ]);
  });

  it("omits a region with zero recipes", () => {
    const recipes = [makeRecipe({ id: "a", region: "afrique-ouest" })];
    expect(getRecipeRegionCounts(recipes).some((entry) => entry.region === "asie")).toBe(false);
  });
});

describe("searchRecipes", () => {
  it("matches a case-insensitive title substring", () => {
    const recipes = [makeRecipe({ id: "a", title: "Thiéboudienne" }), makeRecipe({ id: "b", title: "Mafé" })];
    expect(searchRecipes(recipes, "THIÉ").map((r) => r.id)).toEqual(["a"]);
  });

  it("matches an unaccented query against an accented title", () => {
    const recipes = [makeRecipe({ id: "a", title: "Thiéboudienne" })];
    expect(searchRecipes(recipes, "thieboudienne").map((r) => r.id)).toEqual(["a"]);
  });

  it("matches a description substring", () => {
    const recipes = [makeRecipe({ id: "a", description: "Un plat de riz au poisson" })];
    expect(searchRecipes(recipes, "poisson").map((r) => r.id)).toEqual(["a"]);
  });

  it("returns every recipe for an empty query", () => {
    const recipes = [makeRecipe({ id: "a" }), makeRecipe({ id: "b" })];
    expect(searchRecipes(recipes, "")).toHaveLength(2);
  });
});
