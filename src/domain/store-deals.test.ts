import { describe, expect, it } from "vitest";

import {
  assembleDealsBlocks,
  filterDealsByMinDiscount,
  formatPromoCountLabel,
  parseMinDiscountPercent,
  rankStoresByMaxDiscount,
  type DealProduct,
  type StoreDealsSummary,
} from "./store-deals";

function makeStore(slug: string, maxDiscountPercent: number, products: DealProduct[] = []): StoreDealsSummary {
  return { slug, name: slug, address: "", pickupMinutes: 15, tagline: "", promoCount: 1, maxDiscountPercent, products };
}

function makeProduct(id: string, price: number, compareAtPrice?: number): DealProduct {
  return {
    id,
    slug: id,
    name: id,
    packagingLabel: "",
    price,
    compareAtPrice,
    image: { src: "/img.jpg", alt: id },
    isOutOfStock: false,
    aisleSlug: "epicerie-fine",
    storeSlug: "store",
    storeName: "Store",
  };
}

describe("formatPromoCountLabel", () => {
  it("singular for exactly 1, plural otherwise (0 included)", () => {
    expect(formatPromoCountLabel(1)).toBe("1 promo");
    expect(formatPromoCountLabel(0)).toBe("0 promos");
    expect(formatPromoCountLabel(42)).toBe("42 promos");
  });
});

describe("rankStoresByMaxDiscount", () => {
  it("sorts by max discount percent, descending", () => {
    const stores = [makeStore("a", 20), makeStore("b", 45), makeStore("c", 30)];
    expect(rankStoresByMaxDiscount(stores).map((s) => s.slug)).toEqual(["b", "c", "a"]);
  });
});

describe("parseMinDiscountPercent", () => {
  it("accepts a valid 1-100 integer", () => {
    expect(parseMinDiscountPercent("25")).toBe(25);
    expect(parseMinDiscountPercent("100")).toBe(100);
  });

  it("falls back to 0 (no filter) for anything invalid", () => {
    expect(parseMinDiscountPercent(undefined)).toBe(0);
    expect(parseMinDiscountPercent("bogus")).toBe(0);
    expect(parseMinDiscountPercent("0")).toBe(0);
    expect(parseMinDiscountPercent("101")).toBe(0);
    expect(parseMinDiscountPercent("-5")).toBe(0);
  });
});

describe("filterDealsByMinDiscount", () => {
  it("keeps only products discounted at least that much, computed from real price/compareAtPrice", () => {
    const stores = [
      makeStore("a", 50, [makeProduct("p1", 5, 10), makeProduct("p2", 9, 10)]), // -50%, -10%
    ];
    const result = filterDealsByMinDiscount(stores, 30);
    expect(result[0].products.map((p) => p.id)).toEqual(["p1"]);
  });

  it("drops a store entirely once none of its products clear the threshold", () => {
    const stores = [makeStore("a", 50, [makeProduct("p1", 9, 10)])]; // only -10%
    expect(filterDealsByMinDiscount(stores, 30)).toHaveLength(0);
  });

  it("treats a product with no compareAtPrice as 0% off", () => {
    const stores = [makeStore("a", 50, [makeProduct("p1", 10, undefined)])];
    expect(filterDealsByMinDiscount(stores, 1)).toHaveLength(0);
  });
});

describe("assembleDealsBlocks", () => {
  it("inserts the loyalty banner after the 2nd store", () => {
    const stores = [makeStore("a", 1), makeStore("b", 1), makeStore("c", 1)];
    const blocks = assembleDealsBlocks(stores, "none");
    expect(blocks.map((b) => (b.kind === "store" ? b.store.slug : "banner"))).toEqual(["a", "b", "banner", "c"]);
  });

  it("appends the banner at the end when there are fewer than 2 stores", () => {
    const blocks = assembleDealsBlocks([makeStore("a", 1)], "none");
    expect(blocks.map((b) => (b.kind === "store" ? b.store.slug : "banner"))).toEqual(["a", "banner"]);
  });

  it("omits the banner entirely for an already-VIP user", () => {
    const stores = [makeStore("a", 1), makeStore("b", 1), makeStore("c", 1)];
    const blocks = assembleDealsBlocks(stores, "vip");
    expect(blocks.every((b) => b.kind === "store")).toBe(true);
  });
});
