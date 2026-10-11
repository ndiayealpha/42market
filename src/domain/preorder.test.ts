import { describe, expect, it } from "vitest";

import { getDiscountPercent, getMilestoneLabel, getStockLabel, getStockLevel } from "./preorder";

describe("getDiscountPercent", () => {
  it("rounds the percentage off", () => {
    expect(getDiscountPercent(24.9, 38)).toBe(34);
  });
});

describe("getStockLevel", () => {
  it("is urgent when reservedPercent >= 90", () => {
    expect(getStockLevel(92, 4)).toBe("urgent");
  });

  it("is low when remaining <= 10 and not urgent", () => {
    expect(getStockLevel(84, 8)).toBe("low");
  });

  it("is normal otherwise", () => {
    expect(getStockLevel(72, 14)).toBe("normal");
  });
});

describe("getStockLabel", () => {
  it.each([
    ["urgent" as const, 4, "dispo" as const, "Reste 4 !"],
    ["low" as const, 8, "colis" as const, "Reste 8"],
    ["normal" as const, 14, "dispo" as const, "14 dispo"],
    ["normal" as const, 20, "colis" as const, "20 colis"],
  ])("formats %s / %i / %s as %s", (level, remaining, unit, expected) => {
    expect(getStockLabel(level, remaining, unit)).toBe(expected);
  });
});

describe("getMilestoneLabel", () => {
  it("formats an arrival milestone", () => {
    expect(getMilestoneLabel({ kind: "arrival", date: "2026-04-24" })).toBe("Arrivage Ven. 24");
  });

  it("formats a pickup milestone", () => {
    expect(getMilestoneLabel({ kind: "pickup", date: "2026-04-30" })).toBe("Retrait Jeu. 30");
  });
});
