import { describe, expect, it } from "vitest";

import type { NewArrivalCategory, NewArrivalProduct, NewArrivalSection } from "./new-arrival";
import {
  assembleNewArrivalBlocks,
  filterNewArrivalSectionsByCategory,
  formatNewArrivalCountLabel,
  getNewArrivalsAnchorId,
  parseNewArrivalCategory,
} from "./new-arrival";

function makeProduct(overrides: Partial<NewArrivalProduct>): NewArrivalProduct {
  return {
    id: "p1",
    storeSlug: "loirivoire",
    productSlug: "mangue",
    name: "Mangue",
    image: { src: "/img.jpg", alt: "Mangue" },
    price: 3.8,
    unit: "/ pièce",
    origin: "Mali",
    detail: "Chair sans fibre",
    status: { label: "En stock", tone: "success" },
    categorySlug: "mangues-avion",
    ...overrides,
  };
}

function makeSection(overrides: Partial<NewArrivalSection>): NewArrivalSection {
  return {
    stores: [{ slug: "loirivoire", name: "LoirIvoire" }],
    address: "32 rue des docteurs Charcot, 42000",
    pickupLabel: "Retrait 15 min",
    closesAt: "20h00",
    tagline: "Débarquement ce matin",
    products: [makeProduct({})],
    ...overrides,
  };
}

const CATEGORIES: NewArrivalCategory[] = [
  { slug: "fret-express", label: "Fret Express" },
  { slug: "mangues-avion", label: "Mangues & Fruits par avion" },
];

describe("getNewArrivalsAnchorId", () => {
  it("builds a single-store anchor", () => {
    expect(getNewArrivalsAnchorId(["loirivoire"])).toBe("arrivages-loirivoire");
  });

  it("builds a combined-store anchor", () => {
    expect(getNewArrivalsAnchorId(["nimba-market", "salam-market"])).toBe("arrivages-nimba-market-salam-market");
  });
});

describe("filterNewArrivalSectionsByCategory", () => {
  const sections = [
    makeSection({ products: [makeProduct({ id: "a", categorySlug: "mangues-avion" }), makeProduct({ id: "b", categorySlug: "fret-express" })] }),
    makeSection({ stores: [{ slug: "nimba-market", name: "Nimba Market" }], products: [makeProduct({ id: "c", categorySlug: "fret-express" })] }),
  ];

  it("returns every section unfiltered for \"all\"", () => {
    expect(filterNewArrivalSectionsByCategory(sections, "all")).toEqual(sections);
  });

  it("keeps only matching products and drops now-empty sections", () => {
    const result = filterNewArrivalSectionsByCategory(sections, "mangues-avion");
    expect(result).toHaveLength(1);
    expect(result[0].products.map((p) => p.id)).toEqual(["a"]);
  });
});

describe("assembleNewArrivalBlocks", () => {
  it("inserts the fleet-alert banner after the 2nd section", () => {
    const sections = [makeSection({}), makeSection({}), makeSection({})];
    const blocks = assembleNewArrivalBlocks(sections);
    expect(blocks.map((b) => b.kind)).toEqual(["section", "section", "fleet-alert-banner", "section"]);
  });

  it("appends the banner at the end when there are fewer than 2 sections", () => {
    const blocks = assembleNewArrivalBlocks([makeSection({})]);
    expect(blocks.map((b) => b.kind)).toEqual(["section", "fleet-alert-banner"]);
  });

  it("still appends the banner for an empty list", () => {
    expect(assembleNewArrivalBlocks([]).map((b) => b.kind)).toEqual(["fleet-alert-banner"]);
  });
});

describe("parseNewArrivalCategory", () => {
  it("accepts a known category", () => {
    expect(parseNewArrivalCategory("fret-express", CATEGORIES)).toBe("fret-express");
  });

  it("falls back to \"all\" for an unknown or missing value", () => {
    expect(parseNewArrivalCategory("bogus", CATEGORIES)).toBe("all");
    expect(parseNewArrivalCategory(undefined, CATEGORIES)).toBe("all");
  });
});

describe("formatNewArrivalCountLabel", () => {
  it("pluralizes correctly, including 0", () => {
    expect(formatNewArrivalCountLabel(0)).toBe("0 nouveautés");
    expect(formatNewArrivalCountLabel(1)).toBe("1 nouveauté");
    expect(formatNewArrivalCountLabel(24)).toBe("24 nouveautés");
  });
});
