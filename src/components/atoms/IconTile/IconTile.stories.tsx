import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IconTile } from "./IconTile";

const meta = {
  title: "Atoms/IconTile",
  component: IconTile,
  tags: ["autodocs"],
  args: { icon: "archive", tone: "neutral" },
} satisfies Meta<typeof IconTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Cream: Story = { args: { icon: "zap", tone: "cream" } };
export const Success: Story = { args: { icon: "check-circle", tone: "success" } };
export const Dark: Story = { args: { icon: "store", tone: "dark" } };
