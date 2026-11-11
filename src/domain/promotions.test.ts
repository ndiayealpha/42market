import { describe, expect, it } from "vitest";

import { formatPrice } from "@/src/lib/format";

import {
  buildStorePromoDirectionsUrl,
  formatFlashDeadline,
  formatPromoBadge,
  formatScopeLabel,
  getDeliveryBadgeLabel,
  getStorePromoOpeningStatus,
  matchesPromoFilter,
  parsePromoFilterType,
  type PromoProduct,
  type StorePromoSummary,
} from "./promotions";

const BASE_STORE: StorePromoSummary = {
  slug: "loirivoire",
  name: "LoirIvoire",
  address: "32 rue des docteurs Charcot, 42000 Saint-Étienne",
  storeKindLabel: "Épicerie & Primeur exotique",
  rating: { average: 4.8, reviewCount: 124 },
  image: { src: "/store-header-tomatoes.jpg", alt: "LoirIvoire" },
  pickupMinutes: 15,
  discountLabel: "Jusqu'à -40%",
  itemsOnPromoCount: 45,
  productTags: [],
  distanceMeters: 650,
  description: "Primeur et épicerie exotique.",
  openingHours: { mon: { open: "08:00", close: "20:00" } },
  trustLabel: "Partenaire contrôlé 42 Markets",
  deliversToHome: true,
  deliveryMinutes: 40,
  topProducts: [],
};

const BASE_PRODUCT: PromoProduct = {
  id: "p1",
  slug: "p1",
  name: "Produit",
  packagingLabel: "1kg",
  price: 1,
  aisleSlug: "fruits",
  isOutOfStock: false,
  storeSlug: "loirivoire",
  storeName: "LoirIvoire",
  image: { alt: "Produit" },
  badge: { kind: "percent", percent: 10 },
};

describe("formatPromoBadge", () => {
  it("formats every badge kind", () => {
    expect(formatPromoBadge({ kind: "percent", percent: 28 })).toBe("-28%");
    expect(formatPromoBadge({ kind: "multibuy", quantity: 2, price: 6 })).toBe(`2 pour ${formatPrice(6)}`);
    expect(formatPromoBadge({ kind: "bogo" })).toBe("1+1 Offert");
    expect(formatPromoBadge({ kind: "pack", size: 6 })).toBe("Pack x6");
    expect(formatPromoBadge({ kind: "lot", size: 3 })).toBe("Lot x3");
    expect(formatPromoBadge({ kind: "label", text: "Offre IGP" })).toBe("Offre IGP");
  });
});

describe("parsePromoFilterType", () => {
  it("accepts a known type", () => {
    expect(parsePromoFilterType("flash")).toBe("flash");
  });

  it("defaults to 'all' for anything unknown", () => {
    expect(parsePromoFilterType(undefined)).toBe("all");
    expect(parsePromoFilterType("bogus")).toBe("all");
  });
});

describe("matchesPromoFilter", () => {
  it("'all' matches everything", () => {
    expect(matchesPromoFilter(BASE_PRODUCT, "all")).toBe(true);
  });

  it("'flash' matches only isFlashSale products", () => {
    expect(matchesPromoFilter(BASE_PRODUCT, "flash")).toBe(false);
    expect(matchesPromoFilter({ ...BASE_PRODUCT, isFlashSale: true }, "flash")).toBe(true);
  });

  it("'multibuy' (1 acheté = 1 offert) matches only a bogo badge", () => {
    expect(matchesPromoFilter(BASE_PRODUCT, "multibuy")).toBe(false);
    expect(matchesPromoFilter({ ...BASE_PRODUCT, badge: { kind: "bogo" } }, "multibuy")).toBe(true);
  });

  it("'anti-gaspi' matches only the 'Anti-gaspi' label badge", () => {
    expect(matchesPromoFilter({ ...BASE_PRODUCT, badge: { kind: "label", text: "Offre IGP" } }, "anti-gaspi")).toBe(false);
    expect(matchesPromoFilter({ ...BASE_PRODUCT, badge: { kind: "label", text: "Anti-gaspi" } }, "anti-gaspi")).toBe(true);
  });

  it("'discovery' has no matching data yet — always false", () => {
    expect(matchesPromoFilter(BASE_PRODUCT, "discovery")).toBe(false);
  });
});

describe("formatScopeLabel", () => {
  it("names the primary store plus a count when everything is selected", () => {
    expect(formatScopeLabel("LoirIvoire", 5, 5)).toBe("LoirIvoire & 4 autres");
  });

  it("names only the primary store when it's the only one selected", () => {
    expect(formatScopeLabel("LoirIvoire", 1, 5)).toBe("LoirIvoire");
  });

  it("falls back to a count for a partial selection", () => {
    expect(formatScopeLabel("LoirIvoire", 3, 5)).toBe("3 épiceries sélectionnées");
  });
});

describe("formatFlashDeadline", () => {
  const now = new Date("2026-11-10T10:00:00Z");

  it("formats a same-day deadline as 'ce soir'", () => {
    expect(formatFlashDeadline("2026-11-10T19:00:00Z", now)).toBe("ce soir 20H");
  });

  it("formats a next-day deadline as 'demain'", () => {
    expect(formatFlashDeadline("2026-11-11T19:00:00Z", now)).toBe("demain 20H");
  });

  it("formats a further-out deadline as a short date", () => {
    expect(formatFlashDeadline("2026-11-12T19:00:00Z", now)).toBe("le 12 nov. 20H");
  });
});

describe("getStorePromoOpeningStatus", () => {
  it("is open during the day's opening window", () => {
    expect(getStorePromoOpeningStatus(BASE_STORE, new Date("2026-11-09T10:00:00Z")).isOpen).toBe(true);
  });

  it("is closed outside the day's opening window", () => {
    expect(getStorePromoOpeningStatus(BASE_STORE, new Date("2026-11-09T22:00:00Z")).isOpen).toBe(false);
  });

  it("is closed on a day with no configured hours", () => {
    // 2026-11-10 is a Tuesday — BASE_STORE only configures "mon".
    expect(getStorePromoOpeningStatus(BASE_STORE, new Date("2026-11-10T10:00:00Z"))).toEqual({ isOpen: false, label: "Fermé" });
  });
});

describe("getDeliveryBadgeLabel", () => {
  it("returns null when the global homeDelivery flag is off, even if the store delivers", () => {
    // FEATURE_FLAGS.homeDelivery is false in this app today — the badge must stay hidden everywhere.
    expect(getDeliveryBadgeLabel(BASE_STORE)).toBeNull();
  });

  it("returns null when the store itself doesn't deliver", () => {
    expect(getDeliveryBadgeLabel({ ...BASE_STORE, deliversToHome: false })).toBeNull();
  });
});

describe("buildStorePromoDirectionsUrl", () => {
  it("builds a Google Maps directions URL from the store's address", () => {
    expect(buildStorePromoDirectionsUrl("32 rue des docteurs Charcot, 42000 Saint-Étienne")).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=32%20rue%20des%20docteurs%20Charcot%2C%2042000%20Saint-%C3%89tienne"
    );
  });
});
