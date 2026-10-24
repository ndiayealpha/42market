import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CheckoutHeader } from "./CheckoutHeader";

const meta = {
  title: "Checkout/CheckoutHeader",
  component: CheckoutHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithExpressPromise: Story = {
  args: { hasExpressPromise: true },
};

export const WithoutExpressPromise: Story = {
  args: { hasExpressPromise: false },
};
