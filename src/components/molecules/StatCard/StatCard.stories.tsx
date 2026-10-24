import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatCard } from "./StatCard";

const meta = {
  title: "Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: { value: 12, label: "Commandes" },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Highlight: Story = { args: { value: 420, label: "Points Terroir", highlight: true } };

export const Row: Story = {
  render: () => (
    <div className="flex max-w-md gap-3">
      <StatCard value={12} label="Commandes" />
      <StatCard value={8} label="Favoris" />
      <StatCard value={420} label="Points Terroir" highlight />
    </div>
  ),
};
