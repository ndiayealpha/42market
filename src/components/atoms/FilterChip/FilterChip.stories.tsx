import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FilterChip } from "./FilterChip";

const meta = {
  title: "Atoms/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  args: { href: "#", label: "Ventes Flash", icon: "zap", isActive: false },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { isActive: true } };
export const Compact: Story = { args: { size: "compact", label: "Fruits & Tubercules", icon: undefined } };
export const CompactActive: Story = { args: { size: "compact", label: "Fruits & Tubercules", icon: undefined, isActive: true } };
