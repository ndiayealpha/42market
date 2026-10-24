import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { PROFILE_DETAILS } from "@/src/data/profile.mock";

import { SignOutFooter } from "./SignOutFooter";

const meta = {
  title: "Profile/SignOutFooter",
  component: SignOutFooter,
  tags: ["autodocs"],
  args: { userId: PROFILE_DETAILS.id },
} satisfies Meta<typeof SignOutFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpensDeleteConfirmation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Supprimer définitivement/i }));
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
};
