import { describe, expect, it } from "vitest";

import type { ProductDetail } from "@/src/domain/product-detail";

import { buildProductBreadcrumb, buildProductDetailViewModel, buildProductFacts } from "./productDetailViewModel";

const BASE_PRODUCT: ProductDetail = {
  id: "riz-region-mediterraneenne",
  slug: "riz-region-mediterraneenne",
  name: "Riz - région méditerranéenne (4 kg)",
  storeSlug: "loirivoire",
  storeName: "LoirIvoire",
  aisleSlug: "feculents",
  aisleLabelShort: "Céréales & Féculents",
  aisleLabelLong: "CÉRÉALES & RIZ D'ÉPICERIE FINE",
  price: 12.35,
  compareAtPrice: 15.5,
  vatRatePercent: 5.5,
  packagingLabel: "Grand format sac 4 kg",
  unitBasis: { quantity: 4000, unit: "g" },
  stockCount: 12,
  stockCapPerOrder: 10,
  isBioCertified: true,
  bioCertificationCode: "FR-BIO-01",
  hasFreshnessGuarantee: true,
  rating: { average: 5, reviewCount: 18 },
  media: [{ kind: "photo", src: "/offer-riz-royal-lion.jpg", alt: "Riz" }],
  description: ["Un riz du bassin méditerranéen.", "Deuxième paragraphe."],
  characteristics: { variety: "Riz long grain" },
  allergens: {},
  storeDeliversToHome: false,
  pickupEtaLabel: "Prêt en 2h chez LoirIvoire",
  similar: [],
};

describe("buildProductFacts", () => {
  it("leads with the stock fact, then bio/fraîcheur, capped at 3", () => {
    const facts = buildProductFacts(BASE_PRODUCT);
    expect(facts).toHaveLength(3);
    expect(facts[0].title).toBe("En stock local");
    expect(facts[1].title).toBe("Agriculture Biologique");
    expect(facts[1].subtitle).toBe("FR-BIO-01");
    expect(facts[2].title).toBe("Fraîcheur garantie");
  });

  it("falls back to a generic bio subtitle when no certification code is given", () => {
    const facts = buildProductFacts({ ...BASE_PRODUCT, bioCertificationCode: undefined });
    expect(facts.find((fact) => fact.title === "Agriculture Biologique")?.subtitle).toBe("Certifié bio");
  });

  it("omits bio/fraîcheur facts entirely when the product has neither, falling back to pickup", () => {
    const facts = buildProductFacts({ ...BASE_PRODUCT, isBioCertified: false, hasFreshnessGuarantee: false });
    expect(facts.map((fact) => fact.title)).toEqual(["En stock local", "Retrait en boutique"]);
  });
});

describe("buildProductBreadcrumb", () => {
  it("builds Accueil / Boutique / Rayon court / Produit with no href on the current page", () => {
    const items = buildProductBreadcrumb(BASE_PRODUCT);
    expect(items.map((item) => item.label)).toEqual([
      "Accueil",
      "LoirIvoire",
      "Céréales & Féculents",
      "Riz - région méditerranéenne (4 kg)",
    ]);
    expect(items[3].href).toBeUndefined();
  });
});

describe("buildProductDetailViewModel", () => {
  it("computes savings and a discount percent when there's a reference price", () => {
    const viewModel = buildProductDetailViewModel(BASE_PRODUCT);
    expect(viewModel.savings).toBeCloseTo(3.15, 2);
    expect(viewModel.discountPercent).toBe(20);
  });

  it("leaves savings/discount undefined with no reference price", () => {
    const viewModel = buildProductDetailViewModel({ ...BASE_PRODUCT, compareAtPrice: undefined });
    expect(viewModel.savings).toBeUndefined();
    expect(viewModel.discountPercent).toBeUndefined();
  });
});
