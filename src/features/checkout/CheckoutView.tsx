"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { buildOrderTotals } from "@/src/domain/cart";
import { formatPickupSlotLabel, getCheckoutStepStates, type CheckoutStepId, type PaymentMethodId, type PickupSlot } from "@/src/domain/checkout";
import type { StoreDetail, StoreDetailWithContact } from "@/src/domain/store-detail";
import { usePlaceOrder } from "@/src/hooks/usePlaceOrder";
import { useCartLinesActions, useCartLinesState } from "@/src/lib/cart/cart-lines.store";
import { VAT_RATE_PERCENT } from "@/src/lib/constants";
import { routes } from "@/src/lib/routing/routes";

import { CheckoutTemplate } from "./CheckoutTemplate";
import { buildPickupDays } from "./pickup-schedule";
import { buildSlotsByDay } from "./slot-params";

export interface CheckoutViewProps {
  /** Computed once, server-side, and passed down — never `Date.now()`/`new Date()` inside this client tree's render body. */
  now: Date;
  store: StoreDetailWithContact;
  isPhoneVerified: boolean;
  supportPhone: string;
  year: number;
}

function findSlotById(store: StoreDetail, now: Date, slotId: string | undefined): PickupSlot | undefined {
  if (!slotId) return undefined;
  for (const slots of buildSlotsByDay(store, now).values()) {
    const match = slots.find((slot) => slot.id === slotId);
    if (match) return match;
  }
  return undefined;
}

/** Omit the "sous 2h garanti" pastille only when literally no slot (window or express) is bookable today — the simplest heuristic that still never overpromises. */
function hasExpressPromiseToday(store: StoreDetail, now: Date): boolean {
  const today = buildPickupDays(now, store.openingHours).find((day) => day.isToday);
  if (!today) return false;
  const slotsByDay = buildSlotsByDay(store, now);
  const todaySlots = slotsByDay.get(today.dateIso) ?? [];
  return todaySlots.some((slot) => slot.status !== "unavailable");
}

/**
 * Client container: wires the real cart store, the slot/payment selection
 * state, `getCheckoutStepStates`'s "last interacted step", and
 * `usePlaceOrder` — then hands everything to the pure `CheckoutTemplate`.
 *
 * The brief asks for a server-side redirect to `/main/panier` when the
 * cart is empty on load. `cart-lines.store.ts` is an in-memory, client-only
 * zustand store with no persistence (no cookie, no localStorage) — the
 * Server Component page genuinely cannot see its contents, so a true
 * server-side check isn't possible without changing that store (out of
 * bounds, see the brief's "do not modify" list). This redirects client-side
 * on mount instead, which is the closest honest equivalent; the "empty
 * cart" toast mentioned as a nice-to-have is skipped for the same reason
 * `router.replace` already fires before the page would meaningfully paint.
 */
export function CheckoutView({ now, store, isPhoneVerified, supportPhone, year }: CheckoutViewProps) {
  const router = useRouter();
  const { storeSlug, storeName, lines } = useCartLinesState();
  const { clear } = useCartLinesActions();
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("onsite");
  const [lastInteractedStep, setLastInteractedStep] = useState<CheckoutStepId>("slot");
  const placeOrder = usePlaceOrder();

  // Guarded by `!placeOrder.isSuccess`: a successful order clears the cart
  // on its way to `/main/commandes/cmd-4289`, which would otherwise make
  // `lines.length === 0` true for a render or two and send the user back
  // to `/main/panier` instead, racing (and winning over) the intended
  // redirect — caught via the manual browser smoke test.
  useEffect(() => {
    if (lines.length === 0 && !placeOrder.isSuccess) {
      router.replace(routes.main.cart);
    }
  }, [lines.length, placeOrder.isSuccess, router]);

  const handleSelectSlot = useCallback((slotId: string | undefined) => {
    setSelectedSlotId(slotId);
    setLastInteractedStep("slot");
  }, []);

  const handleChangePaymentMethod = useCallback((id: PaymentMethodId) => {
    setPaymentMethod(id);
    setLastInteractedStep("payment");
  }, []);

  if (lines.length === 0) {
    return null;
  }

  const selectedSlot = findSlotById(store, now, selectedSlotId);
  const selectedSlotLabel = selectedSlot
    ? selectedSlot.kind === "window"
      ? formatPickupSlotLabel(selectedSlot)
      : "Retrait express"
    : undefined;

  const stepStates = getCheckoutStepStates(lastInteractedStep, Boolean(storeSlug));
  const totals = buildOrderTotals(lines, { vatRatePercent: VAT_RATE_PERCENT, isPaid: false });
  const totalLine = totals.find((line) => line.kind === "total");
  const totalAmount = totalLine?.kind === "total" ? totalLine.amount : 0;
  const errorResult = placeOrder.data && !placeOrder.data.ok ? placeOrder.data : undefined;

  function handleConfirm() {
    if (!selectedSlot || !storeSlug || !storeName) return;
    placeOrder.mutate(
      { storeSlug, storeName, lines, slot: selectedSlot, paymentMethod },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          clear();
          router.push(routes.main.orderDetail(result.orderId));
        },
      },
    );
  }

  return (
    <CheckoutTemplate
      now={now}
      store={store}
      cartLines={lines}
      isPhoneVerified={isPhoneVerified}
      supportPhone={supportPhone}
      year={year}
      stepStates={stepStates}
      selectedSlotId={selectedSlotId}
      selectedSlotLabel={selectedSlotLabel}
      onSelectSlot={handleSelectSlot}
      paymentMethod={paymentMethod}
      onChangePaymentMethod={handleChangePaymentMethod}
      hasExpressPromiseToday={hasExpressPromiseToday(store, now)}
      confirmOrder={{
        totalAmount,
        disabled: !selectedSlot,
        isPending: placeOrder.isPending,
        error: errorResult?.error,
        onConfirm: handleConfirm,
      }}
    />
  );
}
