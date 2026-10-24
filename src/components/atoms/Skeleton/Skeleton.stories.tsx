import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    width: 220,
    height: 120,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circle: Story = {
  args: { width: 64, height: 64, radius: "full" },
};
