import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { REFERENCE_ORDER } from "@/src/data/full-order.mock";

import { TrackingStoreSection } from "./TrackingStoreSection";

const meta = {
  title: "OrderTracking/TrackingStoreSection",
  component: TrackingStoreSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { store: REFERENCE_ORDER.store },
} satisfies Meta<typeof TrackingStoreSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Closed: Story = { args: { store: { ...REFERENCE_ORDER.store, isOpenNow: false, openUntilLabel: "Fermé • Ouvre demain 08h00" } } };
