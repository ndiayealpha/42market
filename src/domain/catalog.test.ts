import { describe, expect, it } from "vitest";

import { computeDiscountPercent, formatEditorialTag, getPickupAvailabilityLabel, parseCatalogSort } from "./catalog";

describe("computeDiscountPercent", () => {
  it("rounds 1,80€ vs 2,50€ to -28%", () => {
    expect(computeDiscountPercent(1.8, 2.5)).toBe(28);
  });

  it("returns 0 when compareAt is not actually higher", () => {
    expect(computeDiscountPercent(2.5, 2.5)).toBe(0);
    expect(computeDiscountPercent(3, 2.5)).toBe(0);
  });
});

describe("formatEditorialTag", () => {
  it("renders the exact maquette copy for each tag", () => {
    expect(formatEditorialTag("frais")).toBe("FRAIS");
    expect(formatEditorialTag("mur-a-point")).toBe("Mûr à point");
    expect(formatEditorialTag("top-vente")).toBe("Top Vente");
  });
});

describe("getPickupAvailabilityLabel", () => {
  it("shows the pickup delay when open", () => {
    expect(getPickupAvailabilityLabel(true, 15)).toBe("Retrait immédiat 15 min");
  });

  it("shows an alternative label when closed", () => {
    expect(getPickupAvailabilityLabel(false, 15)).toBe("Retrait dès la réouverture de la boutique");
  });
});

describe("parseCatalogSort", () => {
  it("accepts 'nouveautes'", () => {
    expect(parseCatalogSort("nouveautes")).toBe("nouveautes");
  });

  it("defaults to 'populaires' for anything else, including undefined/arrays", () => {
    expect(parseCatalogSort(undefined)).toBe("populaires");
    expect(parseCatalogSort("bogus")).toBe("populaires");
    expect(parseCatalogSort(["nouveautes"])).toBe("populaires");
  });
});
