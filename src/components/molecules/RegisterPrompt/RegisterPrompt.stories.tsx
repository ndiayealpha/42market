import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RegisterPrompt } from "./RegisterPrompt";

const meta = {
  title: "Molecules/RegisterPrompt",
  component: RegisterPrompt,
  tags: ["autodocs"],
  args: { href: "/auth/create-account" },
} satisfies Meta<typeof RegisterPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
