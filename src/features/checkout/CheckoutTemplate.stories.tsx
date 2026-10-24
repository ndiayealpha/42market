import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import type { CartLine } from "@/src/domain/cart";
import { getCheckoutStepStates, type PaymentMethodId } from "@/src/domain/checkout";
import { STORE_DETAIL } from "@/src/data/store-detail.mock";

import { CheckoutTemplate, type CheckoutTemplateProps } from "./CheckoutTemplate";

const CART_LINES: CartLine[] = [
  {
    id: "line-1",
    productId: "attieke-frais-abidjan",
    name: "Attiéké Frais d'Abidjan sous vide",
    packagingLabel: "500g",
    quantity: 2,
    unitPrice: 1.9,
    image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais d'Abidjan sous vide" },
  },
  {
    id: "line-2",
    productId: "carottes-nouvelles",
    name: "Carottes Nouvelles Maraîchères",
    packagingLabel: "La botte 500g",
    quantity: 1,
    unitPrice: 2.5,
    image: { src: "/stock-carrots.jpg", alt: "Carottes Nouvelles Maraîchères" },
  },
  {
    id: "line-3",
    productId: "riz-royal-lion-5kg",
    name: "Riz Parfumé Brisé Tiep Royal Lion",
    packagingLabel: "Format Éco 5kg",
    quantity: 1,
    unitPrice: 8.9,
    image: { src: "/offer-riz-royal-lion.jpg", alt: "Riz Parfumé Brisé Tiep Royal Lion" },
  },
];

const NOW = new Date("2026-11-24T13:40:00.000Z");

function Controlled(props: CheckoutTemplateProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(props.selectedSlotId);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>(props.paymentMethod);

  return (
    <CheckoutTemplate
      {...props}
      selectedSlotId={selectedSlotId}
      selectedSlotLabel={selectedSlotId ? "14h00 - 15h00" : undefined}
      onSelectSlot={setSelectedSlotId}
      paymentMethod={paymentMethod}
      onChangePaymentMethod={setPaymentMethod}
      stepStates={getCheckoutStepStates(selectedSlotId ? "payment" : "slot", true)}
      confirmOrder={{ ...props.confirmOrder, disabled: !selectedSlotId }}
    />
  );
}

const meta = {
  title: "Checkout/CheckoutTemplate",
  component: CheckoutTemplate,
  tags: ["autodocs"],
  args: {
    now: NOW,
    store: STORE_DETAIL,
    cartLines: CART_LINES,
    isPhoneVerified: true,
    supportPhone: STORE_DETAIL.phone,
    year: 2026,
    stepStates: getCheckoutStepStates("slot", true),
    selectedSlotId: undefined,
    selectedSlotLabel: undefined,
    onSelectSlot: () => {},
    paymentMethod: "onsite",
    onChangePaymentMethod: () => {},
    hasExpressPromiseToday: true,
    confirmOrder: { totalAmount: 15.1, disabled: true, isPending: false, onConfirm: () => {} },
  },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof CheckoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches the reference fixture: LoirIvoire, the 3-line cart, Tuesday 24 Nov 2026 14h40 Paris. */
export const Default: Story = {};
