import type { CartLine } from "@/src/domain/cart";
import type { CheckoutStepId, CheckoutStepState, PaymentMethodId, PlaceOrderError } from "@/src/domain/checkout";
import type { StoreDetailWithContact } from "@/src/domain/store-detail";

import { CheckoutFooter } from "./CheckoutFooter";
import { CheckoutHeader } from "./CheckoutHeader";
import { CheckoutReassuranceRow } from "./CheckoutReassuranceRow";
import { CheckoutStepper } from "./CheckoutStepper";
import { CheckoutStoreSection } from "./CheckoutStoreSection";
import { ConfirmOrderButton } from "./ConfirmOrderButton";
import { HelpCard } from "./HelpCard";
import { OrderRecapSection } from "./OrderRecapSection";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { PickupSlotPicker } from "./PickupSlotPicker";

export interface ConfirmOrderSlice {
  totalAmount: number;
  disabled: boolean;
  isPending: boolean;
  error?: PlaceOrderError;
  onConfirm: () => void;
}

export interface CheckoutTemplateProps {
  now: Date;
  store: StoreDetailWithContact;
  cartLines: CartLine[];
  isPhoneVerified: boolean;
  supportPhone: string;
  year: number;
  stepStates: Record<CheckoutStepId, CheckoutStepState>;
  selectedSlotId: string | undefined;
  selectedSlotLabel: string | undefined;
  onSelectSlot: (slotId: string | undefined) => void;
  paymentMethod: PaymentMethodId;
  onChangePaymentMethod: (id: PaymentMethodId) => void;
  hasExpressPromiseToday: boolean;
  confirmOrder: ConfirmOrderSlice;
}

/**
 * Pure composition of K1→K10 — no hooks, no state, everything comes from
 * props (`CheckoutView` owns all the stateful wiring). Layout: K2 full
 * width, then a 7/12 (K3, K4, K5) + 5/12 (K6 with K7/K8 nested, K9) split
 * on `lg` that collapses to one stacked column — because the right
 * column's children come after the left column's in the DOM, the mobile
 * stack naturally reads K3, K4, K5, K6, K7, K8, K9 in order.
 */
export function CheckoutTemplate({
  now,
  store,
  cartLines,
  isPhoneVerified,
  supportPhone,
  year,
  stepStates,
  selectedSlotId,
  selectedSlotLabel,
  onSelectSlot,
  paymentMethod,
  onChangePaymentMethod,
  hasExpressPromiseToday,
  confirmOrder,
}: CheckoutTemplateProps) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      <CheckoutHeader hasExpressPromise={hasExpressPromiseToday} />
      <CheckoutStepper storeName={store.name} selectedSlotLabel={selectedSlotLabel} stepStates={stepStates} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <CheckoutStoreSection store={store} now={now} />
          <PickupSlotPicker now={now} store={store} selectedSlotId={selectedSlotId} onSelectSlot={onSelectSlot} />
          <CheckoutReassuranceRow isPhoneVerified={isPhoneVerified} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <OrderRecapSection lines={cartLines}>
            <PaymentMethodSelector storeName={store.name} value={paymentMethod} onChange={onChangePaymentMethod} />
            <ConfirmOrderButton {...confirmOrder} />
          </OrderRecapSection>
          <HelpCard supportPhone={supportPhone} />
        </div>
      </div>

      <CheckoutFooter year={year} />
    </div>
  );
}
