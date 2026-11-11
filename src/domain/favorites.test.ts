import { describe, expect, it } from "vitest";

import { formatPrice } from "@/src/lib/format";

import {
  computeBulkSelection,
  filterFavoriteProducts,
  filterFavoriteRecipesByTerroir,
  formatFavoriteUnitPrice,
  formatFavoritesHeaderInsight,
  getFavoritesTabIntro,
  groupFavoriteProductsByStore,
  paginateFavoriteRecipes,
  parseFavoritesSort,
  parseFavoritesTab,
  parseTerroirRegionFilter,
  sortFavoriteProducts,
  type FavoriteProduct,
  type FavoriteRecipe,
} from "./favorites";

const PRODUCT_A: FavoriteProduct = {
  id: "a",
  slug: "a",
  name: "Carottes Fanes",
  packagingLabel: "la botte",
  price: 2.5,
  storeSlug: "loirivoire",
  storeName: "LoirIvoire",
  stockStatus: "unknown",
  terroirRegion: "afrique-ouest",
  image: { alt: "Carottes Fanes" },
};

const PRODUCT_B: FavoriteProduct = {
  ...PRODUCT_A,
  id: "b",
  name: "Attiéké",
  price: 2.2,
  storeSlug: "nimba-market",
  storeName: "Nimba Market",
};

describe("formatFavoriteUnitPrice", () => {
  it("falls back to 'Prix unitaire' without a unit basis", () => {
    expect(formatFavoriteUnitPrice(2.5)).toBe("Prix unitaire");
  });

  it("formats a weighed item per kg, rounded (not truncated like the maquette)", () => {
    expect(formatFavoriteUnitPrice(1.9, { quantity: 150, unit: "g" })).toBe(`${formatPrice(12.666666666666666)}/kg`);
  });

  it("formats a liquid item per liter", () => {
    expect(formatFavoriteUnitPrice(4.5, { quantity: 1000, unit: "ml" })).toBe(`${formatPrice(4.5)}/L`);
  });
});

describe("sortFavoriteProducts", () => {
  const products = [PRODUCT_A, PRODUCT_B];

  it("sorts by recent-added order", () => {
    expect(sortFavoriteProducts(products, "recent", ["b", "a"]).map((p) => p.id)).toEqual(["b", "a"]);
  });

  it("sorts by price ascending", () => {
    expect(sortFavoriteProducts(products, "price-asc", []).map((p) => p.id)).toEqual(["b", "a"]);
  });

  it("sorts by name A→Z", () => {
    expect(sortFavoriteProducts(products, "name-asc", []).map((p) => p.id)).toEqual(["b", "a"]);
  });
});

describe("parseFavoritesSort / parseFavoritesTab / parseTerroirRegionFilter", () => {
  it("defaults unknown values", () => {
    expect(parseFavoritesSort("bogus")).toBe("recent");
    expect(parseFavoritesTab("bogus")).toBe("produits");
    expect(parseTerroirRegionFilter("bogus")).toBe("all");
  });

  it("accepts known values", () => {
    expect(parseFavoritesSort("price-desc")).toBe("price-desc");
    expect(parseFavoritesTab("recettes")).toBe("recettes");
    expect(parseTerroirRegionFilter("maghreb")).toBe("maghreb");
  });
});

describe("filterFavoriteProducts", () => {
  const products = [PRODUCT_A, { ...PRODUCT_B, terroirRegion: "maghreb" as const, stockStatus: "out-of-stock" as const }];

  it("returns everything with the default (no-op) filters", () => {
    expect(filterFavoriteProducts(products, { terroirRegion: "all", inStockOnly: false, storeSlugs: [], query: "" })).toHaveLength(2);
  });

  it("narrows by terroir region", () => {
    expect(filterFavoriteProducts(products, { terroirRegion: "maghreb", inStockOnly: false, storeSlugs: [], query: "" })).toEqual([products[1]]);
  });

  it("narrows to in-stock only", () => {
    expect(filterFavoriteProducts(products, { terroirRegion: "all", inStockOnly: true, storeSlugs: [], query: "" })).toEqual([]);
  });

  it("narrows by store slugs and a case-insensitive name search", () => {
    expect(filterFavoriteProducts(products, { terroirRegion: "all", inStockOnly: false, storeSlugs: ["nimba-market"], query: "" })).toEqual([products[1]]);
    expect(filterFavoriteProducts(products, { terroirRegion: "all", inStockOnly: false, storeSlugs: [], query: "carottes" })).toEqual([products[0]]);
  });
});

describe("computeBulkSelection", () => {
  it("sums only the selected items and groups them by store", () => {
    const summary = computeBulkSelection([PRODUCT_A, PRODUCT_B], new Set(["a", "b"]));
    expect(summary.count).toBe(2);
    expect(summary.totalPrice).toBeCloseTo(4.7, 5);
    expect(summary.byStore).toEqual([
      { storeSlug: "loirivoire", storeName: "LoirIvoire", count: 1, totalPrice: 2.5 },
      { storeSlug: "nimba-market", storeName: "Nimba Market", count: 1, totalPrice: 2.2 },
    ]);
  });

  it("is always derived from the selection, never a fixed number", () => {
    const summary = computeBulkSelection([PRODUCT_A, PRODUCT_B], new Set(["a"]));
    expect(summary.totalPrice).toBe(PRODUCT_A.price);
    expect(formatPrice(summary.totalPrice)).toBe(formatPrice(PRODUCT_A.price));
  });
});

const BASE_RECIPE: FavoriteRecipe = {
  id: "r1",
  name: "Thiéboudienne",
  servings: 6,
  totalPrice: 24.9,
  image: { src: "/x.jpg", alt: "Thiéboudienne" },
  href: "/main/recettes",
  storeSlug: "loirivoire",
  storeName: "LoirIvoire",
  durationMinutes: 60,
  difficulty: "moyen",
  terroirRegion: "afrique-ouest",
};

describe("parseTerroirRegionFilter", () => {
  it("accepts the 4 known regions, including 'asie'", () => {
    expect(parseTerroirRegionFilter("asie")).toBe("asie");
    expect(parseTerroirRegionFilter("maghreb")).toBe("maghreb");
  });

  it("falls back to 'all' for an unknown value", () => {
    expect(parseTerroirRegionFilter("inconnu")).toBe("all");
  });
});

describe("filterFavoriteRecipesByTerroir", () => {
  const recipes: FavoriteRecipe[] = [BASE_RECIPE, { ...BASE_RECIPE, id: "r2", terroirRegion: "asie" }];

  it("returns every recipe for 'all'", () => {
    expect(filterFavoriteRecipesByTerroir(recipes, "all")).toHaveLength(2);
  });

  it("filters to the matching region", () => {
    expect(filterFavoriteRecipesByTerroir(recipes, "asie").map((r) => r.id)).toEqual(["r2"]);
  });
});

describe("paginateFavoriteRecipes", () => {
  const recipes: FavoriteRecipe[] = Array.from({ length: 30 }, (_, i) => ({ ...BASE_RECIPE, id: `r${i}` }));

  it("returns the first page and signals more remain", () => {
    const { items, hasMore } = paginateFavoriteRecipes(recipes, 1);
    expect(items).toHaveLength(24);
    expect(hasMore).toBe(true);
  });

  it("returns everything once the page covers the full list", () => {
    const { items, hasMore } = paginateFavoriteRecipes(recipes, 2);
    expect(items).toHaveLength(30);
    expect(hasMore).toBe(false);
  });
});

describe("getFavoritesTabIntro", () => {
  it("returns distinct copy for each tab", () => {
    const intros = new Set(["produits", "epiceries", "recettes"].map((tab) => getFavoritesTabIntro(tab as never)));
    expect(intros.size).toBe(3);
  });
});

describe("formatFavoritesHeaderInsight", () => {
  const counts = { products: 1, stores: 5, recipes: 3 };

  it("matches the tab badge count exactly, singular/plural aware", () => {
    expect(formatFavoritesHeaderInsight("produits", counts, "Saint-Étienne")).toBe("1 produit sauvegardé");
    expect(formatFavoritesHeaderInsight("epiceries", counts, "Saint-Étienne")).toBe("5 épiceries sauvegardées à Saint-Étienne");
    expect(formatFavoritesHeaderInsight("recettes", counts, "Saint-Étienne")).toBe("3 recettes sauvegardées");
  });
});

describe("groupFavoriteProductsByStore", () => {
  it("groups by store, preserving the incoming order within each group", () => {
    const products: FavoriteProduct[] = [
      { id: "p1", slug: "p1", name: "B", packagingLabel: "", price: 1, storeSlug: "s1", storeName: "Store 1", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "", alt: "" } },
      { id: "p2", slug: "p2", name: "A", packagingLabel: "", price: 1, storeSlug: "s2", storeName: "Store 2", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "", alt: "" } },
      { id: "p3", slug: "p3", name: "C", packagingLabel: "", price: 1, storeSlug: "s1", storeName: "Store 1", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "", alt: "" } },
    ];
    const groups = groupFavoriteProductsByStore(products);
    expect(groups.map((g) => g.storeSlug)).toEqual(["s1", "s2"]);
    expect(groups[0].products.map((p) => p.id)).toEqual(["p1", "p3"]);
  });

  it("returns an empty array for an empty list", () => {
    expect(groupFavoriteProductsByStore([])).toEqual([]);
  });
});
