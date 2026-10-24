import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MetaChip } from "./MetaChip";

const meta = {
  title: "Atoms/MetaChip",
  component: MetaChip,
  tags: ["autodocs"],
  args: { icon: "clock", label: "15-30 min" },
} satisfies Meta<typeof MetaChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FreePickup: Story = { args: { icon: "check-circle", label: "0 € de frais de retrait" } };
