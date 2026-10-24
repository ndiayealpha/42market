import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TERROIRS } from "@/src/data/profile.mock";

import { TerroirCard } from "./TerroirCard";

const meta = {
  title: "Profile/TerroirCard",
  component: TerroirCard,
  tags: ["autodocs"],
  args: { terroir: TERROIRS[0] },
  decorators: [(Story) => <ul className="max-w-xs"><Story /></ul>],
} satisfies Meta<typeof TerroirCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Inactive: Story = {
  args: { terroir: { ...TERROIRS[1], isActive: false } },
};
