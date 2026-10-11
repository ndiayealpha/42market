import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AuthTabs } from "./AuthTabs";

const meta = {
  title: "Molecules/AuthTabs",
  component: AuthTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AuthTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
