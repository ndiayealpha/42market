import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { ConfirmOrderButton } from "./ConfirmOrderButton";

const meta = {
  title: "Checkout/ConfirmOrderButton",
  component: ConfirmOrderButton,
  tags: ["autodocs"],
  args: { totalAmount: 19.8, onConfirm: fn() },
} satisfies Meta<typeof ConfirmOrderButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: { disabled: false, isPending: false },
};

export const DisabledNoSlot: Story = {
  args: { disabled: true, isPending: false },
};

export const Pending: Story = {
  args: { disabled: false, isPending: true },
};

export const ErreurALaConfirmation: Story = {
  args: { disabled: false, isPending: false, error: { kind: "slot-unavailable" } },
};
