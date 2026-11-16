import { describe, expect, it } from "vitest";

import { formatLocationLabel, formatRadiusLabel, isValidFrenchPostalCode, RADIUS_OPTIONS_KM } from "./user-location";

describe("formatRadiusLabel", () => {
  it("formats a radius in km", () => {
    expect(formatRadiusLabel(3)).toBe("Rayon 3 km");
    expect(formatRadiusLabel(20)).toBe("Rayon 20 km");
  });
});

describe("formatLocationLabel", () => {
  it("appends the France suffix", () => {
    expect(formatLocationLabel("42000")).toBe("42000, FR");
  });
});

describe("isValidFrenchPostalCode", () => {
  it("accepts exactly 5 digits", () => {
    expect(isValidFrenchPostalCode("42000")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isValidFrenchPostalCode("4200")).toBe(false);
    expect(isValidFrenchPostalCode("420000")).toBe(false);
    expect(isValidFrenchPostalCode("Paris")).toBe(false);
    expect(isValidFrenchPostalCode("")).toBe(false);
  });

  it("tolerates surrounding whitespace", () => {
    expect(isValidFrenchPostalCode(" 42000 ")).toBe(true);
  });
});

describe("RADIUS_OPTIONS_KM", () => {
  it("is a sorted, ascending list", () => {
    expect([...RADIUS_OPTIONS_KM]).toEqual([...RADIUS_OPTIONS_KM].sort((a, b) => a - b));
  });
});
