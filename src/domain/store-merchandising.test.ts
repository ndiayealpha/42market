import { describe, expect, it } from "vitest";

import { getStockStatusLabel } from "./store-merchandising";

describe("getStockStatusLabel", () => {
  it("formats in-stock with a remaining count", () => {
    expect(getStockStatusLabel({ status: "in-stock", remaining: 4 })).toBe("En stock (4 restants)");
  });

  it("formats arrived-today", () => {
    expect(getStockStatusLabel({ status: "arrived-today" })).toBe("Arrivé ce matin (Dernier lot)");
  });

  it("formats out-of-stock", () => {
    expect(getStockStatusLabel({ status: "out-of-stock" })).toBe("Rupture temporaire");
  });
});
