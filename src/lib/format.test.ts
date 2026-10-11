import { describe, expect, it } from "vitest";

import { formatDistance, formatDuration, formatPrice, formatRating, formatShortDay } from "./format";

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
