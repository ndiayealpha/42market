import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CheckoutFooter } from "./CheckoutFooter";

const meta = {
  title: "Checkout/CheckoutFooter",
  component: CheckoutFooter,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { year: 2026 },
};
