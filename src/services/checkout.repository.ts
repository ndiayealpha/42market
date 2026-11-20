import type { CartLine } from "@/src/domain/cart";
import type { PaymentMethodId, PickupSlot, PlaceOrderResult } from "@/src/domain/checkout";

export interface PlaceOrderInput {
  storeSlug: string;
  storeName: string;
  lines: CartLine[];
  slot: PickupSlot;
  paymentMethod: PaymentMethodId;
}

export interface CheckoutRepository {
  placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult>;
}

/**
 * Mock implementation — the interactive browser flow always succeeds (the
 * demo path has to work end-to-end), and the fixed id "cmd-4289" is
 * load-bearing: Page S (order tracking) is keyed to this exact id, not a
 * server-generated one.
 *
 * `placeOrder`/`usePlaceOrder` run entirely client-side (a React Query
 * mutation, no network call of its own), so reassigning that one demo
 * order's ownership can't be done by calling
 * `order-tracking.repository.ts` directly from here — that would only
 * mutate the browser's own copy of its in-memory store, never the
 * server's, which is the one `app/main/commandes/[id]/page.tsx` (a Server
 * Component) reads from. `/api/checkout/claim-order` is a real round trip
 * to the server for exactly that reassignment, reading the current user
 * from the session rather than trusting a client-supplied id.
 *
 * A real backend could reject with any `PlaceOrderError` branch; nothing
 * here simulates that automatically — `ConfirmOrderButton`'s Storybook
 * "ErreurÀLaConfirmation" story exercises that state directly via props,
 * not through this repository (rule: no MSW for this pass).
 */
export const mockCheckoutRepository: CheckoutRepository = {
  async placeOrder({ slot }): Promise<PlaceOrderResult> {
    const orderId = "cmd-4289";
    const response = await fetch("/api/checkout/claim-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // M3: the server re-validates the slot itself (never trusts a
      // client clock) — only the fields it needs to do that, not the
      // whole cart.
      body: JSON.stringify({ orderId, slot: slot.kind === "window" ? { kind: slot.kind, startIso: slot.startIso, endIso: slot.endIso } : { kind: slot.kind } }),
    });
    if (response.status === 409) {
      return { ok: false, error: { kind: "slot-unavailable" } };
    }
    if (!response.ok) {
      return { ok: false, error: { kind: "payment-declined" } };
    }
    return { ok: true, orderId };
  },
};
