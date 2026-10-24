import { describe, expect, it } from "vitest";

import { formatPrice } from "@/src/lib/format";

import { computeBulkSelection, filterFavoriteProducts, formatFavoriteUnitPrice, parseFavoritesSort, parseFavoritesTab, parseTerroirRegionFilter, sortFavoriteProducts, type FavoriteProduct } from "./favorites";

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
