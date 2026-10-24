import { describe, expect, it } from "vitest";

import {
  computeUnitPricePerKg,
  formatDistance,
  formatDistanceCompact,
  formatDistanceFromKm,
  formatDuration,
  formatLongDate,
  formatMemberSince,
  formatNumber,
  formatPickupWindow,
  formatPrice,
  formatRating,
  formatRelativeTime,
  formatShortDay,
  formatUnitPrice,
  formatUpdatedAt,
} from "./format";

describe("formatDistance", () => {
  it.each([
    [600, "À 600m"],
    [850, "À 850m"],
    [1000, "À 1 km"],
    [2100, "À 2,1 km"],
  ])("formats %i meters as %s", (meters, expected) => {
    expect(formatDistance(meters)).toBe(expected);
  });
});

describe("formatDistanceFromKm", () => {
  it("converts kilometers to meters before formatting, matching formatDistance", () => {
    expect(formatDistanceFromKm(0.65)).toBe("À 650m");
    expect(formatDistanceFromKm(1.2)).toBe("À 1,2 km");
  });
});

describe("formatDistanceCompact", () => {
  it("has no leading sentence wording, unlike formatDistance", () => {
    expect(formatDistanceCompact(0.65)).toBe("650 m");
    expect(formatDistanceCompact(1.2)).toBe("1,2 km");
  });
});

describe("formatPrice", () => {
  it("formats as fr-FR EUR currency", () => {
    expect(formatPrice(24.9)).toBe("24,90 €");
  });
});

describe("formatRating", () => {
  it("formats with one decimal and a dot", () => {
    expect(formatRating(4.9)).toBe("4.9");
  });
});

describe("formatShortDay", () => {
  it("formats an ISO date as a capitalized short weekday + day", () => {
    expect(formatShortDay("2026-04-24")).toBe("Ven. 24");
  });
});

describe("formatDuration", () => {
  it.each([
    [45, "45 min"],
    [50, "50 min"],
    [60, "1h00"],
    [75, "1h15"],
  ])("formats %i minutes as %s", (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected);
  });
});

describe("formatNumber", () => {
  it.each([
    [4.8, "4,8"],
    [1.2, "1,2"],
    [25, "25"],
  ])("formats %s as %s", (value, expected) => {
    expect(formatNumber(value)).toBe(expected);
  });
});

describe("computeUnitPricePerKg", () => {
  it.each([
    [1.9, 500, 3.8],
    [1.85, 400, 4.625],
  ])("computes (%s €, %i g) as %s €/kg", (amount, grams, expected) => {
    expect(computeUnitPricePerKg(amount, grams)).toBeCloseTo(expected, 5);
  });
});

describe("formatUnitPrice", () => {
  it("formats a per-kg amount with the unit suffix", () => {
    expect(formatUnitPrice(3.8)).toBe("3,80 €/kg");
  });

  it("documents the known maquette discrepancy: standard rounding gives 4,63, the maquette shows 4,62", () => {
    expect(formatUnitPrice(computeUnitPricePerKg(1.85, 400))).toBe("4,63 €/kg");
  });
});

describe("formatUpdatedAt", () => {
  const now = new Date("2026-08-10T12:00:00Z");

  it("formats a same-day timestamp as \"aujourd'hui HHhMM\"", () => {
    expect(formatUpdatedAt("2026-08-10T08:30:00Z", now)).toBe("aujourd'hui 08h30");
  });

  it("formats yesterday's timestamp as \"hier HHhMM\"", () => {
    expect(formatUpdatedAt("2026-08-09T08:30:00Z", now)).toBe("hier 08h30");
  });

  it("formats an older timestamp as a short date", () => {
    expect(formatUpdatedAt("2026-08-01T08:30:00Z", now)).toBe("1 août");
  });
});

describe("formatLongDate", () => {
  it("formats an ISO date in full French form", () => {
    expect(formatLongDate("2026-08-12")).toBe("12 août 2026");
  });
});

describe("formatMemberSince", () => {
  it("formats an ISO date as a capitalized month + year", () => {
    expect(formatMemberSince("2023-01-15")).toBe("Janvier 2023");
  });
});

describe("formatRelativeTime", () => {
  const now = new Date("2026-11-10T12:00:00Z");

  it.each([
    ["2026-11-10T11:59:30Z", "À l'instant"],
    ["2026-11-10T11:55:00Z", "Il y a 5 min"],
    ["2026-11-10T09:00:00Z", "Il y a 3 heures"],
    ["2026-11-10T11:00:00Z", "Il y a 1 heure"],
    ["2026-11-09T16:40:00Z", "Hier à 16:40"],
    ["2026-11-06T12:00:00Z", "Il y a 4 jours"],
  ])("formats %s relative to now as %s", (iso, expected) => {
    expect(formatRelativeTime(iso, now)).toBe(expected);
  });

  it("falls back to a short date beyond 6 days", () => {
    expect(formatRelativeTime("2026-11-01T12:00:00Z", now)).toBe("1 nov.");
  });
});

describe("formatPickupWindow", () => {
  const now = new Date("2026-11-10T08:00:00Z");

  it("labels a same-day window as 'Aujourd'hui'", () => {
    expect(formatPickupWindow(now, "2026-11-10T14:00:00Z", "2026-11-10T19:00:00Z")).toBe("Aujourd'hui 14h - 19h");
  });

  it("labels the next day as 'Demain'", () => {
    expect(formatPickupWindow(now, "2026-11-11T09:00:00Z", "2026-11-11T13:00:00Z")).toBe("Demain 9h - 13h");
  });
});
