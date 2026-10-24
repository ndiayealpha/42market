import { describe, expect, it } from "vitest";

import { computeRecipeTotal, type RecipeKitIngredient } from "./recipe-kit";

const INGREDIENTS: RecipeKitIngredient[] = [
  { id: "riz", label: "Riz parfumé 1x brisé (1kg)", price: 8.9, isAvailable: true },
  { id: "chinchard", label: "Chinchard frais nettoyé (2 pcs)", price: 3.5, isAvailable: true },
  { id: "gombos", label: "Gombos frais de saison (300g)", price: 2.4, isAvailable: false },
];

describe("computeRecipeTotal", () => {
  it("sums only the checked ingredients", () => {
    const total = computeRecipeTotal(INGREDIENTS, new Set(["riz", "chinchard"]));
    expect(total.totalPrice).toBe(12.4);
    expect(total.checkedCount).toBe(2);
  });

  it("reports allAvailable=false as soon as one ingredient (checked or not) is out of stock", () => {
    const total = computeRecipeTotal(INGREDIENTS, new Set(["riz"]));
    expect(total.allAvailable).toBe(false);
  });

  it("returns a zero total when nothing is checked", () => {
    const total = computeRecipeTotal(INGREDIENTS, new Set());
    expect(total.totalPrice).toBe(0);
    expect(total.checkedCount).toBe(0);
  });
});
