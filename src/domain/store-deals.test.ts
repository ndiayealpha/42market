import { describe, expect, it } from "vitest";

import { assembleDealsBlocks, formatPromoCountLabel, rankStoresByMaxDiscount, type StoreDealsSummary } from "./store-deals";

function makeStore(slug: string, maxDiscountPercent: number): StoreDealsSummary {
  return { slug, name: slug, address: "", pickupMinutes: 15, tagline: "", promoCount: 1, maxDiscountPercent, products: [] };
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
