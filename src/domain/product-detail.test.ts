import { describe, expect, it } from "vitest";

import { buildCharacteristicRows, clampQuantity, computeSavings } from "@/src/domain/product-detail";

describe("computeSavings", () => {
  it("returns undefined when there's no reference price or it isn't actually higher", () => {
    expect(computeSavings(12.35, undefined)).toBeUndefined();
    expect(computeSavings(12.35, 10)).toBeUndefined();
  });

  it("returns the rounded difference when the reference price is higher", () => {
    expect(computeSavings(12.35, 15.5)).toBeCloseTo(3.15, 2);
  });
});

describe("clampQuantity", () => {
  it("never goes below 1", () => {
    expect(clampQuantity(0, 12, 10)).toBe(1);
    expect(clampQuantity(-5, 12, 10)).toBe(1);
  });

  it("caps at the lower of stock and the per-order ceiling", () => {
    expect(clampQuantity(99, 3, 10)).toBe(3);
    expect(clampQuantity(99, 12, 5)).toBe(5);
  });
});

describe("buildCharacteristicRows", () => {
  it("omits fields with no data instead of a blank row", () => {
    expect(buildCharacteristicRows({ variety: "Riz blanc" })).toEqual([{ label: "Variété", value: "Riz blanc" }]);
    expect(buildCharacteristicRows({})).toEqual([]);
  });

  it("keeps the fixed field order regardless of insertion order", () => {
    const rows = buildCharacteristicRows({ packagedAt: "Valence", variety: "Riz blanc", netWeight: "4000 g" });
    expect(rows.map((row) => row.label)).toEqual(["Variété", "Poids net", "Conditionné à"]);
  });
});
