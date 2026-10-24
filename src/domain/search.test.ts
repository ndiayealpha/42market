import { describe, expect, it } from "vitest";

import {
  filterSearchGroups,
  normalizeSearchQuery,
  parseSearchFilters,
  resolveStoreResultsLink,
  type SearchStoreGroup,
} from "@/src/domain/search";

describe("normalizeSearchQuery", () => {
  it("trims, compacts internal whitespace and caps length", () => {
    expect(normalizeSearchQuery("  Bananes    Plantains  ")).toBe("Bananes Plantains");
    expect(normalizeSearchQuery("a".repeat(100))).toHaveLength(80);
  });
});

describe("parseSearchFilters", () => {
  it("falls back to defaults for unknown or missing params, never crashing", () => {
    expect(parseSearchFilters({})).toEqual({ pickupWithin2h: false, promoOnly: false, bulkOnly: false, storeSlug: "all", sort: "distance" });
  });

  it("reads every known param from the URL", () => {
    expect(parseSearchFilters({ retrait: "2h", promo: "1", gros: "1", epicerie: "loirivoire", tri: "rating" })).toEqual({
      pickupWithin2h: true,
      promoOnly: true,
      bulkOnly: true,
      storeSlug: "loirivoire",
      sort: "rating",
    });
  });
});

describe("resolveStoreResultsLink", () => {
  it("falls back to search when there are more matches than shown, catalog otherwise", () => {
    expect(resolveStoreResultsLink(6, 8, "/catalog", "/search")).toEqual({ kind: "search", foundCount: 8, href: "/search" });
    expect(resolveStoreResultsLink(4, 4, "/catalog", "/search")).toEqual({ kind: "catalog", totalCount: 4, href: "/catalog" });
  });
});

describe("filterSearchGroups", () => {
  const GROUPS: SearchStoreGroup[] = [
    {
      slug: "loirivoire",
      name: "LoirIvoire",
      pickupLabel: "15 min",
      distanceLabel: "0,6 km",
      highlight: { kind: "tagline", text: "" },
      resultsLink: { kind: "catalog", totalCount: 1, href: "" },
      products: [{ id: "p1", slug: "p1", name: "A", packagingLabel: "", price: 1, image: { alt: "" }, storeSlug: "loirivoire", storeName: "LoirIvoire", isOutOfStock: false, badge: { kind: "discount", percent: 10 } }],
    },
    {
      slug: "nimba-market",
      name: "Nimba",
      pickupLabel: "30 min",
      distanceLabel: "0,45 km",
      highlight: { kind: "tagline", text: "" },
      resultsLink: { kind: "catalog", totalCount: 1, href: "" },
      products: [{ id: "p2", slug: "p2", name: "B", packagingLabel: "", price: 1, image: { alt: "" }, storeSlug: "nimba-market", storeName: "Nimba", isOutOfStock: false }],
    },
  ];

  it("keeps only the matching store when filtered by storeSlug", () => {
    expect(filterSearchGroups(GROUPS, { pickupWithin2h: false, promoOnly: false, bulkOnly: false, storeSlug: "nimba-market", sort: "distance" }).map((g) => g.slug)).toEqual(["nimba-market"]);
  });

  it("drops a group with no promo product left when promoOnly is on", () => {
    expect(filterSearchGroups(GROUPS, { pickupWithin2h: false, promoOnly: true, bulkOnly: false, storeSlug: "all", sort: "distance" }).map((g) => g.slug)).toEqual(["loirivoire"]);
  });
});
