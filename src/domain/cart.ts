import type { Media } from "@/src/domain/store-merchandising";
import { formatPrice } from "@/src/lib/format";

export interface CartLine {
  id: string;
  productId: string;
  name: string;
  packagingLabel: string;
  quantity: number;
  unitPrice: number;
  image: Media;
  /** Small green accroche, e.g. "Récolté sous 48h" — omitted when the line has none. */
  accrocheLabel?: string;
}

export interface Cart {
  storeSlug: string;
  storeName: string;
  lines: CartLine[];
}

/** Rounded to the cent — the one place a line's price × quantity is computed (rule: pas de calcul dupliqué). */
export function computeLineTotal(line: Pick<CartLine, "unitPrice" | "quantity">): number {
  return Math.round(line.unitPrice * line.quantity * 100) / 100;
}

/** Prices in this repo are VAT-included (see `store-merchandising.ts`) — this extracts the VAT portion already inside `amount`, not an amount to add. */
export function computeVatAmount(amount: number, vatRatePercent: number): number {
  const vat = amount - amount / (1 + vatRatePercent / 100);
  return Math.round(vat * 100) / 100;
}

/**
 * The typed line list behind `OrderTotals` — the SAME shape and the SAME
 * builder for Page K (not yet paid) and Page S (paid or not), so the two
 * screens can never drift apart on what a total is made of (incohérence #5:
 * K showed 1,03 € of VAT, S showed 0,98 € for the identical 19,80 €).
 */
export type OrderTotalLine =
  | { kind: "subtotal"; amount: number }
  | { kind: "discount"; amount: number; label: string }
  | { kind: "service"; label: string; infoText: string }
  | { kind: "included"; label: string }
  | { kind: "total"; amount: number; vatAmount: number; vatRatePercent: number; isPaid: boolean };

export interface BuildOrderTotalsOptions {
  discountAmount?: number;
  vatRatePercent: number;
  isPaid: boolean;
}

export function buildOrderTotals(lines: Pick<CartLine, "unitPrice" | "quantity">[], options: BuildOrderTotalsOptions): OrderTotalLine[] {
  const subtotal = Math.round(lines.reduce((sum, line) => sum + computeLineTotal(line), 0) * 100) / 100;
  const discount = options.discountAmount ?? 0;
  const total = Math.round((subtotal - discount) * 100) / 100;
  const vatAmount = computeVatAmount(total, options.vatRatePercent);

  const result: OrderTotalLine[] = [{ kind: "subtotal", amount: subtotal }];
  if (discount > 0) result.push({ kind: "discount", amount: discount, label: "Remise" });
  result.push({
    kind: "service",
    label: "Préparation Click & Collect",
    infoText: "La préparation de votre panier en boutique est gratuite, sans minimum d'achat.",
  });
  result.push({ kind: "included", label: "Conditionnement kraft recyclable" });
  result.push({ kind: "total", amount: total, vatAmount, vatRatePercent: options.vatRatePercent, isPaid: options.isPaid });
  return result;
}

export function formatOrderTotalAmount(amount: number): string {
  return formatPrice(amount);
}
