import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { PasswordVisibilityButton } from "./PasswordVisibilityButton";

const meta = {
  title: "Atoms/PasswordVisibilityButton",
  component: PasswordVisibilityButton,
  tags: ["autodocs"],
  args: { onToggle: fn() },
} satisfies Meta<typeof PasswordVisibilityButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hidden: Story = {
  args: { visible: false },
};

export const Visible: Story = {
  args: { visible: true },
};
