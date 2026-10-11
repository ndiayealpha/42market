import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { RememberMe } from "./RememberMe";

const meta = {
  title: "Molecules/RememberMe",
  component: RememberMe,
  tags: ["autodocs"],
  args: { checked: false, onChange: fn() },
} satisfies Meta<typeof RememberMe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};
