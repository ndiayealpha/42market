import { describe, expect, it } from "vitest";

import type { GroupPreorderCampaign } from "./group-preorder";
import {
  filterCampaigns,
  formatClosingLabel,
  getAverageDiscountPercent,
  getCampaignUnitPrice,
  getFillPercent,
  getProgressState,
  getRemaining,
  getRibbonLabel,
  getStoreOptions,
  isCampaignUrgent,
  isThresholdReached,
  parseGroupPreorderCategory,
  parseGroupPreorderSort,
  sortCampaigns,
  URGENT_CLOSING_HOURS,
  URGENT_REMAINING_MAX,
  formatCampaignCountLabel,
} from "./group-preorder";

const NOW = new Date("2026-05-20T12:00:00Z");

function makeCampaign(overrides: Partial<GroupPreorderCampaign>): GroupPreorderCampaign {
  return {
    id: "camp-1",
    storeSlug: "loirivoire",
    storeName: "LoirIvoire",
    neighborhood: "Bellevue",
    title: "Carton Mangues Kent (4.5kg)",
    description: "Description",
    image: { src: "/img.jpg", alt: "Carton Mangues Kent" },
    originBadge: "Fret Avion Direct Mali",
    price: 24.9,
    originalPrice: 37.9,
    merchandisingSuffix: "de remise",
    reservedQuantity: 42,
    capacityQuantity: 50,
    minimumThreshold: 45,
    unitLabel: "cartons",
    closesAtIso: "2026-05-27T23:59:00Z",
    arrivalDateIso: "2026-05-24",
    pickupMode: "Click & Collect 10h",
    packagingQuantity: 4.5,
    packagingUnit: "kg",
    categorySlug: "fruits-avion",
    ...overrides,
  };
}

describe("getFillPercent", () => {
  it("rounds reserved/capacity", () => {
    expect(getFillPercent(makeCampaign({ reservedQuantity: 42, capacityQuantity: 50 }))).toBe(84);
  });
});

describe("getRemaining", () => {
  it("is capacity minus reserved", () => {
    expect(getRemaining(makeCampaign({ reservedQuantity: 42, capacityQuantity: 50 }))).toBe(8);
  });
});

describe("isThresholdReached", () => {
  it("is false below the minimum threshold even at a high fill rate", () => {
    expect(isThresholdReached(makeCampaign({ reservedQuantity: 42, minimumThreshold: 45 }))).toBe(false);
  });

  it("is true once the minimum threshold is met, even below full capacity", () => {
    expect(isThresholdReached(makeCampaign({ reservedQuantity: 46, capacityQuantity: 50, minimumThreshold: 40 }))).toBe(true);
  });
});

describe("isCampaignUrgent", () => {
  it("is true when remaining stock is at or below the urgent threshold", () => {
    expect(URGENT_REMAINING_MAX).toBe(5);
    const campaign = makeCampaign({ reservedQuantity: 46, capacityQuantity: 50, closesAtIso: "2026-06-01T00:00:00Z" });
    expect(isCampaignUrgent(campaign, NOW)).toBe(true);
  });

  it("is true when closing within the urgent window, even with plenty of stock", () => {
    expect(URGENT_CLOSING_HOURS).toBe(24);
    const campaign = makeCampaign({ reservedQuantity: 10, capacityQuantity: 50, closesAtIso: "2026-05-20T20:00:00Z" });
    expect(isCampaignUrgent(campaign, NOW)).toBe(true);
  });

  it("is false otherwise", () => {
    const campaign = makeCampaign({ reservedQuantity: 10, capacityQuantity: 50, closesAtIso: "2026-06-01T00:00:00Z" });
    expect(isCampaignUrgent(campaign, NOW)).toBe(false);
  });
});

describe("getCampaignUnitPrice", () => {
  it("divides price by the packaging quantity", () => {
    expect(getCampaignUnitPrice(makeCampaign({ price: 24.9, packagingQuantity: 4.5 }))).toBeCloseTo(5.53, 2);
  });
});

describe("getRibbonLabel", () => {
  it("computes \"-N% {suffix}\" from the discount by default", () => {
    expect(getRibbonLabel(makeCampaign({ price: 24.9, originalPrice: 37.9, merchandisingSuffix: "de remise" }))).toBe("-34% de remise");
  });

  it("uses the authored override instead when present", () => {
    expect(getRibbonLabel(makeCampaign({ ribbonOverride: "Urgent : Reste 4" }))).toBe("Urgent : Reste 4");
  });
});

describe("getProgressState", () => {
  it("shows \"Palier validé !\" once the minimum threshold is met, even if also urgent", () => {
    const campaign = makeCampaign({ reservedQuantity: 46, capacityQuantity: 50, minimumThreshold: 40, closesAtIso: "2026-06-01T00:00:00Z" });
    expect(getProgressState(campaign, NOW)).toEqual({ label: "Palier validé !", isAlert: true });
  });

  it("shows a bare countdown when urgent but below threshold", () => {
    const campaign = makeCampaign({ reservedQuantity: 47, capacityQuantity: 50, minimumThreshold: 48, closesAtIso: "2026-06-01T00:00:00Z" });
    expect(getProgressState(campaign, NOW)).toEqual({ label: "Reste 3 !", isAlert: true });
  });

  it("shows the plain remaining count otherwise", () => {
    const campaign = makeCampaign({ reservedQuantity: 20, capacityQuantity: 50, minimumThreshold: 45, unitLabel: "sacs", closesAtIso: "2026-06-01T00:00:00Z" });
    expect(getProgressState(campaign, NOW)).toEqual({ label: "Reste 30 sacs", isAlert: false });
  });
});

describe("filterCampaigns", () => {
  const campaigns = [
    makeCampaign({ id: "a", categorySlug: "fruits-avion", storeSlug: "loirivoire" }),
    makeCampaign({ id: "b", categorySlug: "riz-cereales", storeSlug: "saveurs-dafrique" }),
  ];

  it("returns everything for category \"all\" and an empty store list", () => {
    expect(filterCampaigns(campaigns, "all", [])).toHaveLength(2);
  });

  it("filters by category", () => {
    expect(filterCampaigns(campaigns, "riz-cereales", []).map((c) => c.id)).toEqual(["b"]);
  });

  it("filters by selected stores", () => {
    expect(filterCampaigns(campaigns, "all", ["loirivoire"]).map((c) => c.id)).toEqual(["a"]);
  });
});

describe("sortCampaigns", () => {
  const campaigns = [
    makeCampaign({ id: "soon", closesAtIso: "2026-05-21T00:00:00Z", price: 10, originalPrice: 12, reservedQuantity: 10, capacityQuantity: 50 }),
    makeCampaign({ id: "later", closesAtIso: "2026-05-30T00:00:00Z", price: 10, originalPrice: 20, reservedQuantity: 45, capacityQuantity: 50 }),
  ];

  it("sorts by closing date ascending", () => {
    expect(sortCampaigns(campaigns, "closing-soon").map((c) => c.id)).toEqual(["soon", "later"]);
  });

  it("sorts by discount percent descending", () => {
    expect(sortCampaigns(campaigns, "discount").map((c) => c.id)).toEqual(["later", "soon"]);
  });

  it("sorts by fill rate descending", () => {
    expect(sortCampaigns(campaigns, "fill-rate").map((c) => c.id)).toEqual(["later", "soon"]);
  });

  it("does not mutate the input array", () => {
    const original = [...campaigns];
    sortCampaigns(campaigns, "discount");
    expect(campaigns).toEqual(original);
  });
});

describe("getStoreOptions", () => {
  it("aggregates campaign counts per store", () => {
    const campaigns = [
      makeCampaign({ id: "a", storeSlug: "loirivoire", storeName: "LoirIvoire" }),
      makeCampaign({ id: "b", storeSlug: "loirivoire", storeName: "LoirIvoire" }),
      makeCampaign({ id: "c", storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique" }),
    ];
    expect(getStoreOptions(campaigns)).toEqual([
      { slug: "loirivoire", name: "LoirIvoire", neighborhood: "Bellevue", campaignCount: 2 },
      { slug: "saveurs-dafrique", name: "Saveurs d'Afrique", neighborhood: "Bellevue", campaignCount: 1 },
    ]);
  });
});

describe("getAverageDiscountPercent", () => {
  it("computes the mean discount percent, rounded", () => {
    const campaigns = [makeCampaign({ price: 10, originalPrice: 20 }), makeCampaign({ price: 10, originalPrice: 12.5 })];
    expect(getAverageDiscountPercent(campaigns)).toBe(35);
  });

  it("is 0 for an empty list", () => {
    expect(getAverageDiscountPercent([])).toBe(0);
  });
});

describe("parseGroupPreorderSort", () => {
  it("accepts a known value and falls back otherwise", () => {
    expect(parseGroupPreorderSort("discount")).toBe("discount");
    expect(parseGroupPreorderSort("bogus")).toBe("closing-soon");
    expect(parseGroupPreorderSort(undefined)).toBe("closing-soon");
  });
});

describe("parseGroupPreorderCategory", () => {
  const categories = [{ slug: "fruits-avion", label: "Fruits par avion" }];

  it("accepts a known category and falls back to \"all\" otherwise", () => {
    expect(parseGroupPreorderCategory("fruits-avion", categories)).toBe("fruits-avion");
    expect(parseGroupPreorderCategory("bogus", categories)).toBe("all");
  });
});

describe("formatClosingLabel", () => {
  it("says \"Ce soir\" when closing the same day", () => {
    const campaign = makeCampaign({ closesAtIso: "2026-05-20T20:00:00Z" });
    expect(formatClosingLabel(campaign, NOW)).toBe("Ce soir 20h");
  });

  it("says \"Demain\" when closing the next day", () => {
    const campaign = makeCampaign({ closesAtIso: "2026-05-21T18:00:00Z" });
    expect(formatClosingLabel(campaign, NOW)).toBe("Demain 18h");
  });

  it("uses the full weekday name further out, with minutes when not on the hour", () => {
    const campaign = makeCampaign({ closesAtIso: "2026-05-27T23:59:00Z" });
    expect(formatClosingLabel(campaign, NOW)).toBe("Mercredi 23h59");
  });
});

describe("formatCampaignCountLabel", () => {
  it("pluralizes correctly, including 0", () => {
    expect(formatCampaignCountLabel(0)).toBe("0 campagnes");
    expect(formatCampaignCountLabel(1)).toBe("1 campagne");
    expect(formatCampaignCountLabel(8)).toBe("8 campagnes");
  });
});
