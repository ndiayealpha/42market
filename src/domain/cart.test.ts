import { describe, expect, it } from "vitest";

import { buildOrderTotals, computeLineTotal, computeVatAmount, type CartLine } from "@/src/domain/cart";

const LINES: CartLine[] = [
  { id: "l1", productId: "p1", name: "Panier de Saison Maraîcher", packagingLabel: "1 unité", quantity: 1, unitPrice: 12.5, image: { alt: "" } },
  { id: "l2", productId: "p2", name: "Fraises Gariguette Bio", packagingLabel: "250g", quantity: 1, unitPrice: 3.4, image: { alt: "" } },
  { id: "l3", productId: "p3", name: "Attiéké Frais d'Abidjan", packagingLabel: "500g", quantity: 1, unitPrice: 3.9, image: { alt: "" } },
];

describe("computeLineTotal", () => {
  it("multiplies unit price by quantity, rounded to the cent", () => {
    expect(computeLineTotal({ unitPrice: 3.33, quantity: 3 })).toBe(9.99);
  });
});

describe("computeVatAmount", () => {
  it("extracts the VAT already included in a VAT-included amount", () => {
    expect(computeVatAmount(19.8, 5.5)).toBeCloseTo(1.03, 2);
  });
});

describe("buildOrderTotals", () => {
  it("builds subtotal, service, included and total lines from the reference 3-line cart, with one single VAT figure", () => {
    const lines = buildOrderTotals(LINES, { vatRatePercent: 5.5, isPaid: false });
    expect(lines).toEqual([
      { kind: "subtotal", amount: 19.8 },
      { kind: "service", label: "Préparation Click & Collect", infoText: expect.any(String) },
      { kind: "included", label: "Conditionnement kraft recyclable" },
      { kind: "total", amount: 19.8, vatAmount: expect.closeTo(1.03, 2), vatRatePercent: 5.5, isPaid: false },
    ]);
  });

  it("includes a discount line only when a discount is actually applied, and labels the total paid once isPaid is true", () => {
    const lines = buildOrderTotals(LINES, { vatRatePercent: 5.5, isPaid: true, discountAmount: 2 });
    expect(lines.some((line) => line.kind === "discount")).toBe(true);
    const total = lines.find((line) => line.kind === "total");
    expect(total).toMatchObject({ amount: 17.8, isPaid: true });
  });
});
