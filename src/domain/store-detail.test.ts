import { describe, expect, it } from "vitest";

import { buildDirectionsUrl, buildTelUrl, getOpeningStatus } from "./store-detail";

const MONDAY_HOURS = { mon: { open: "08:00", close: "19:30" } };

describe("getOpeningStatus", () => {
  it("is open one minute before closing", () => {
    // 2026-08-10 is a Monday.
    const result = getOpeningStatus(MONDAY_HOURS, new Date("2026-08-10T19:29:00Z"));
    expect(result).toEqual({ isOpen: true, label: "Ouvert • Ferme à 19h30" });
  });

  it("is closed exactly at closing time", () => {
    const result = getOpeningStatus(MONDAY_HOURS, new Date("2026-08-10T19:30:00Z"));
    expect(result).toEqual({ isOpen: false, label: "Fermé • Ouvre à 08h00" });
  });

  it("is closed with no label detail when today has no hours", () => {
    // 2026-08-11 is a Tuesday — no entry in MONDAY_HOURS.
    const result = getOpeningStatus(MONDAY_HOURS, new Date("2026-08-11T12:00:00Z"));
    expect(result).toEqual({ isOpen: false, label: "Fermé" });
  });
});

describe("buildDirectionsUrl", () => {
  it("builds a Google Maps directions URL from the address", () => {
    const url = buildDirectionsUrl({ street: "32 rue des docteurs Charcot", city: "Saint-Étienne" });
    expect(url).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=32%20rue%20des%20docteurs%20Charcot%2C%20Saint-%C3%89tienne"
    );
  });
});

describe("buildTelUrl", () => {
  it("strips spaces and dots into a dialable tel: URL", () => {
    expect(buildTelUrl("04 77 00 00 00")).toBe("tel:0477000000");
    expect(buildTelUrl("04.77.00.00.00")).toBe("tel:0477000000");
  });
});
