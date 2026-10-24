import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    children: <div className="h-16 bg-catalog-chip" />,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
