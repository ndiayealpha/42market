import type { IconName } from "@/src/components/atoms/Icon/Icon";
import { formatPrice } from "@/src/lib/format";

export type PaymentMethodId = "online" | "onsite";

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  icon: IconName;
  label: string;
  mention: string;
  description: (storeName: string) => string;
}

/** Table, not a switch (rule O) — one line per method, availability per store is read from the repo, never hardcoded here. */
export const PAYMENT_METHOD_CONFIG: Record<PaymentMethodId, PaymentMethodConfig> = {
  online: {
    id: "online",
    icon: "credit-card",
    label: "Paiement sécurisé en ligne",
    mention: "CB • Stripe",
    description: () => "Retrait direct au comptoir sur présentation du QR code sans manipulation d'argent.",
  },
  onsite: {
    id: "onsite",
    icon: "basket",
    label: "Règlement sur place au retrait",
    mention: "Espèces ou CB",
    description: (storeName) => `Payez directement au commerçant de ${storeName} à la remise des courses.`,
  },
};

export type PickupSlotStatus = "available" | "selected" | "unavailable";

export type PickupSlot =
  | { kind: "window"; id: string; startIso: string; endIso: string; status: PickupSlotStatus; isRecommended: boolean; isLastSlot: boolean; unavailableReason?: string }
  | { kind: "express"; id: string; readyInMinutes: number; lockedAfterMinutes: number; status: PickupSlotStatus; unavailableReason?: string };

export interface PickupDay {
  dateIso: string;
  label: string;
  isToday: boolean;
  isClosed: boolean;
}

export interface BuildPickupSlotsParams {
  /** Store opening bound for the target day, ISO with offset. */
  openIso: string;
  /** Store closing bound for the target day, ISO with offset. */
  closeIso: string;
  now: Date;
  /** Minimum lead time from `now` for a window to count as "recommended" — earlier windows already in progress stay bookable, just not the default. */
  pickupDelayMinutes: number;
  slotDurationMinutes: number;
  /** Slot generation stops this many minutes before closing; the final window absorbs the remainder (rule: "dernier créneau = fermeture moins une marge"). */
  closingMarginMinutes: number;
  fullSlotIds?: string[];
  expressReadyMinutes: number;
  expressLockMinutes: number;
  isExpressAvailable: boolean;
}

/**
 * Pure, Europe/Paris-aware (every bound is an ISO instant with its own
 * offset, so DST shifts are already baked into `openIso`/`closeIso` by the
 * caller — this function only does instant arithmetic, never re-derives a
 * timezone). `now` is always injected (rule 6: no `Date.now()` in render).
 */
export function buildPickupSlots(params: BuildPickupSlotsParams): PickupSlot[] {
  const open = new Date(params.openIso).getTime();
  const close = new Date(params.closeIso).getTime();
  const now = params.now.getTime();
  const fullIds = new Set(params.fullSlotIds ?? []);
  const slotMs = params.slotDurationMinutes * 60_000;
  const marginCutoff = close - params.closingMarginMinutes * 60_000;
  const recommendedCutoff = now + params.pickupDelayMinutes * 60_000;

  const windows: { start: number; end: number }[] = [];
  let cursor = open;
  while (cursor < marginCutoff) {
    const remaining = marginCutoff - cursor;
    const isFinal = remaining <= slotMs * 1.5;
    const end = isFinal ? marginCutoff : cursor + slotMs;
    windows.push({ start: cursor, end });
    cursor = end;
  }

  const firstRecommendedIndex = windows.findIndex((w) => w.start >= recommendedCutoff);
  const recommendedIndex = firstRecommendedIndex === -1 ? windows.length - 1 : firstRecommendedIndex;

  const slots: PickupSlot[] = windows.map((w, index) => {
    const id = `slot-${new Date(w.start).toISOString()}`;
    const isPast = now >= w.end;
    const status: PickupSlotStatus = fullIds.has(id) || isPast ? "unavailable" : "available";
    return {
      kind: "window",
      id,
      startIso: new Date(w.start).toISOString(),
      endIso: new Date(w.end).toISOString(),
      status,
      isRecommended: index === recommendedIndex && status === "available",
      isLastSlot: index === windows.length - 1,
      unavailableReason: status === "unavailable" ? (isPast ? "Créneau passé" : "Complet") : undefined,
    };
  });

  const expressStatus: PickupSlotStatus = params.isExpressAvailable ? "available" : "unavailable";
  slots.push({
    kind: "express",
    id: "slot-express",
    readyInMinutes: params.expressReadyMinutes,
    lockedAfterMinutes: params.expressLockMinutes,
    status: expressStatus,
    unavailableReason: expressStatus === "unavailable" ? "Complet" : undefined,
  });

  return slots;
}

/** Marks `selectedSlotId` as "selected", every other non-unavailable slot back to "available" — kept separate from `buildPickupSlots` (rule S: one function, one responsibility). */
export function applySlotSelection(slots: PickupSlot[], selectedSlotId: string | undefined): PickupSlot[] {
  return slots.map((slot) => {
    if (slot.status === "unavailable") return slot;
    return { ...slot, status: slot.id === selectedSlotId ? "selected" : "available" };
  });
}

export function formatPickupSlotLabel(slot: Extract<PickupSlot, { kind: "window" }>): string {
  const format = (iso: string) => {
    const date = new Date(iso);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return minutes === 0 ? `${hours}h00` : `${hours}h${String(minutes).padStart(2, "0")}`;
  };
  return `${format(slot.startIso)} - ${format(slot.endIso)}`;
}

export type CheckoutStepId = "store" | "slot" | "payment";
export type CheckoutStepState = "done" | "current" | "upcoming";

/**
 * `lastInteractedStep` defaults to "slot" per rule: "courante = dernière
 * section avec laquelle l'utilisateur a interagi (défaut : créneau)".
 * "Point de retrait" is "done" as soon as the cart has fixed a store,
 * independent of interaction order; "Validation" can never be "done" on
 * this page (it only completes when the order is actually created).
 */
export function getCheckoutStepStates(lastInteractedStep: CheckoutStepId, hasStoreSelected: boolean): Record<CheckoutStepId, CheckoutStepState> {
  const order: CheckoutStepId[] = ["store", "slot", "payment"];
  const currentIndex = order.indexOf(lastInteractedStep);
  const states = {} as Record<CheckoutStepId, CheckoutStepState>;

  for (const [index, id] of order.entries()) {
    if (id === lastInteractedStep) {
      states[id] = "current";
    } else if (id === "payment") {
      states[id] = "upcoming";
    } else if (id === "store") {
      states[id] = hasStoreSelected ? "done" : "current";
    } else {
      states[id] = index < currentIndex ? "done" : "upcoming";
    }
  }
  return states;
}

export type PlaceOrderError =
  | { kind: "empty-cart" }
  | { kind: "slot-unavailable" }
  | { kind: "price-changed"; newTotal: number }
  | { kind: "out-of-stock"; productName: string }
  | { kind: "store-closed" }
  | { kind: "payment-declined" };

export function formatPlaceOrderError(error: PlaceOrderError): string {
  switch (error.kind) {
    case "empty-cart":
      return "Votre cabas est vide.";
    case "slot-unavailable":
      return "Ce créneau vient d'être réservé par un autre client. Choisissez-en un autre.";
    case "price-changed":
      return `Le prix de votre commande a changé (nouveau total : ${formatPrice(error.newTotal)}).`;
    case "out-of-stock":
      return `${error.productName} n'est plus disponible.`;
    case "store-closed":
      return "Cette épicerie est fermée, la commande ne peut pas être validée.";
    case "payment-declined":
      return "Le paiement a été refusé. Vérifiez votre moyen de paiement.";
    default: {
      const exhaustive: never = error;
      throw new Error(`Unhandled place-order error: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export type PlaceOrderResult = { ok: true; orderId: string } | { ok: false; error: PlaceOrderError };
