import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { STORE_DETAIL } from "@/src/data/store-detail.mock";

import { PickupSlotPicker, type PickupSlotPickerProps } from "./PickupSlotPicker";

function Controlled(props: PickupSlotPickerProps) {
  const [selectedSlotId, setSelectedSlotId] = useState(props.selectedSlotId);
  return <PickupSlotPicker {...props} selectedSlotId={selectedSlotId} onSelectSlot={setSelectedSlotId} />;
}

const meta = {
  title: "Checkout/PickupSlotPicker",
  component: PickupSlotPicker,
  tags: ["autodocs"],
  args: { store: STORE_DETAIL, selectedSlotId: undefined, onSelectSlot: fn() },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof PickupSlotPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Reproduces `checkout.test.ts`'s reference instant: Tuesday 24 Nov 2026, 14h40 Paris — 5 available windows plus the express tile. */
export const Today: Story = {
  args: { now: new Date("2026-11-24T13:40:00.000Z") },
};

/** 19h25 Paris, 5 minutes before closing: every window has already ended and express is inside its own lock window — the whole grid renders as unavailable. */
export const NoSlotsAvailableToday: Story = {
  args: { now: new Date("2026-11-24T18:25:00.000Z") },
};

/** A future day (express is only ever offered for today) landed on directly via `initialDateIso` — demonstrates the express tile's locked state next to otherwise-available windows. */
export const ExpressLocked: Story = {
  args: { now: new Date("2026-11-24T13:40:00.000Z"), initialDateIso: "2026-11-25" },
};
