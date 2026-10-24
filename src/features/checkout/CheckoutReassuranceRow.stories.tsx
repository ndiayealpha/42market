import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CheckoutReassuranceRow } from "./CheckoutReassuranceRow";

const meta = {
  title: "Checkout/CheckoutReassuranceRow",
  component: CheckoutReassuranceRow,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutReassuranceRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneVerified: Story = {
  args: { isPhoneVerified: true },
};

export const PhoneNotVerified: Story = {
  args: { isPhoneVerified: false },
};
