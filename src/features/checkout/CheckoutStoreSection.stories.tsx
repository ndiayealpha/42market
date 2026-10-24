import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { STORE_DETAIL } from "@/src/data/store-detail.mock";

import { CheckoutStoreSection } from "./CheckoutStoreSection";

const meta = {
  title: "Checkout/CheckoutStoreSection",
  component: CheckoutStoreSection,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutStoreSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: { store: STORE_DETAIL, now: new Date("2026-10-22T10:00:00Z") },
};

export const Closed: Story = {
  // Before the 08:00 Paris opening — guaranteed "Fermé" regardless of weekday.
  args: { store: STORE_DETAIL, now: new Date("2026-10-22T05:00:00Z") },
};
