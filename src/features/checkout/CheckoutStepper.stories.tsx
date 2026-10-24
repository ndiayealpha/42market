import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { getCheckoutStepStates } from "@/src/domain/checkout";

import { CheckoutStepper } from "./CheckoutStepper";

const meta = {
  title: "Checkout/CheckoutStepper",
  component: CheckoutStepper,
  tags: ["autodocs"],
  args: { storeName: "LoirIvoire" },
} satisfies Meta<typeof CheckoutStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SlotCurrent: Story = {
  args: { stepStates: getCheckoutStepStates("slot", true), selectedSlotLabel: undefined },
};

export const SlotSelected: Story = {
  args: { stepStates: getCheckoutStepStates("slot", true), selectedSlotLabel: "14h00 - 15h00" },
};

export const PaymentCurrent: Story = {
  args: { stepStates: getCheckoutStepStates("payment", true), selectedSlotLabel: "14h00 - 15h00" },
};
