import { describe, expect, it } from "vitest";

import type { Store } from "@/src/domain/store";

import {
  DEFAULT_STORE_LISTING_FILTERS,
  filterStores,
  formatStoreCountLabel,
  getStoreNeighborhoods,
  parseStoreListingNeighborhood,
  parseStoreListingSort,
  parseStoreListingToggle,
  QUICK_PICKUP_MAX_MINUTES,
  sortStores,
} from "./store-listing";

function makeStore(overrides: Partial<Store>): Store {
  return {
    id: "store",
    href: "/main/epiceries/store",
    name: "Store",
    image: { src: "/img.jpg", alt: "Store" },
    rating: 4.5,
    distanceMeters: 1000,
    status: { kind: "open" },
    description: "Description",
    pickupMinutes: 20,
    neighborhood: "Centre-Ville",
    ...overrides,
  };
}

describe("parseStoreListingSort", () => {
  it("accepts a known value", () => {
    expect(parseStoreListingSort("rating")).toBe("rating");
  });

  it("falls back to \"distance\" for an unknown or missing value", () => {
    expect(parseStoreListingSort("bogus")).toBe("distance");
    expect(parseStoreListingSort(undefined)).toBe("distance");
  });
});

describe("parseStoreListingNeighborhood", () => {
  it("accepts a value present in the available list", () => {
    expect(parseStoreListingNeighborhood("Carnot", ["Carnot", "Bellevue"])).toBe("Carnot");
  });

  it("falls back to null for a stale or unknown value", () => {
    expect(parseStoreListingNeighborhood("Ailleurs", ["Carnot"])).toBeNull();
    expect(parseStoreListingNeighborhood(undefined, ["Carnot"])).toBeNull();
  });
});

describe("parseStoreListingToggle", () => {
  it("is on for \"true\"", () => {
    expect(parseStoreListingToggle("true")).toBe(true);
  });

  it("is off for anything else, including undefined", () => {
    expect(parseStoreListingToggle("false")).toBe(false);
    expect(parseStoreListingToggle(undefined)).toBe(false);
  });
});

describe("getStoreNeighborhoods", () => {
  it("dedupes and sorts alphabetically", () => {
    const stores = [makeStore({ neighborhood: "Carnot" }), makeStore({ neighborhood: "Bellevue" }), makeStore({ neighborhood: "Carnot" })];
    expect(getStoreNeighborhoods(stores)).toEqual(["Bellevue", "Carnot"]);
  });
});

describe("filterStores", () => {
  const stores = [
    makeStore({ id: "a", neighborhood: "Bellevue", status: { kind: "open" }, pickupMinutes: 10, promo: { label: "-10%", tone: "pink" } }),
    makeStore({ id: "b", neighborhood: "Carnot", status: { kind: "closed" }, pickupMinutes: 20 }),
  ];

  it("returns everything with the default (no-op) filters", () => {
    expect(filterStores(stores, DEFAULT_STORE_LISTING_FILTERS)).toHaveLength(2);
  });

  it("filters by neighborhood", () => {
    const result = filterStores(stores, { ...DEFAULT_STORE_LISTING_FILTERS, neighborhood: "Carnot" });
    expect(result.map((s) => s.id)).toEqual(["b"]);
  });

  it("filters by open-now", () => {
    const result = filterStores(stores, { ...DEFAULT_STORE_LISTING_FILTERS, openNow: true });
    expect(result.map((s) => s.id)).toEqual(["a"]);
  });

  it("filters by quick pickup (<= 15 min)", () => {
    expect(QUICK_PICKUP_MAX_MINUTES).toBe(15);
    const result = filterStores(stores, { ...DEFAULT_STORE_LISTING_FILTERS, quickPickup: true });
    expect(result.map((s) => s.id)).toEqual(["a"]);
  });

  it("filters by active promos only", () => {
    const result = filterStores(stores, { ...DEFAULT_STORE_LISTING_FILTERS, activePromosOnly: true });
    expect(result.map((s) => s.id)).toEqual(["a"]);
  });

  it("combines filters (AND, not OR)", () => {
    const result = filterStores(stores, { ...DEFAULT_STORE_LISTING_FILTERS, neighborhood: "Bellevue", openNow: true, quickPickup: true });
    expect(result.map((s) => s.id)).toEqual(["a"]);
  });
});

describe("sortStores", () => {
  const stores = [
    makeStore({ id: "far", distanceMeters: 3000, rating: 4.9, pickupMinutes: 10 }),
    makeStore({ id: "near", distanceMeters: 500, rating: 4.5, pickupMinutes: 20 }),
  ];

  it("sorts by distance ascending", () => {
    expect(sortStores(stores, "distance").map((s) => s.id)).toEqual(["near", "far"]);
  });

  it("sorts by rating descending", () => {
    expect(sortStores(stores, "rating").map((s) => s.id)).toEqual(["far", "near"]);
  });

  it("sorts by pickup time ascending", () => {
    expect(sortStores(stores, "pickup").map((s) => s.id)).toEqual(["far", "near"]);
  });

  it("does not mutate the input array", () => {
    const original = [...stores];
    sortStores(stores, "rating");
    expect(stores).toEqual(original);
  });
});

describe("formatStoreCountLabel", () => {
  it("pluralizes correctly, including 0", () => {
    expect(formatStoreCountLabel(0)).toBe("0 épiceries");
    expect(formatStoreCountLabel(1)).toBe("1 épicerie");
    expect(formatStoreCountLabel(18)).toBe("18 épiceries");
  });
});
