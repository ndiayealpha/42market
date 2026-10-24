import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PickupTimeChip } from "./PickupTimeChip";

const meta = {
  title: "Atoms/PickupTimeChip",
  component: PickupTimeChip,
  tags: ["autodocs"],
  args: { label: "Retrait 15 min", tone: "success" },
} satisfies Meta<typeof PickupTimeChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Neutral: Story = { args: { label: "Retrait en 2h", tone: "neutral" } };
