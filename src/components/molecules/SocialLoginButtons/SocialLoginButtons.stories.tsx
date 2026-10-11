import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SocialLoginButtons } from "./SocialLoginButtons";

const meta = {
  title: "Molecules/SocialLoginButtons",
  component: SocialLoginButtons,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SocialLoginButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
