import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { SocialButton } from "./SocialButton";

const meta = {
  title: "Molecules/SocialButton",
  component: SocialButton,
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = {
  args: { provider: "google", label: "Google" },
};

export const Apple: Story = {
  args: { provider: "apple", label: "Apple" },
};

export const ContinueWithGoogle: Story = {
  args: { provider: "google", label: "Continuer avec Google" },
};
