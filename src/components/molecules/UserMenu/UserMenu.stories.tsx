import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { UserMenu } from "./UserMenu";

const meta = {
  title: "Molecules/UserMenu",
  component: UserMenu,
  tags: ["autodocs"],
  args: {
    name: "Aïssatou D.",
    tier: "Club Terroir Gold",
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoTier: Story = {
  args: { tier: undefined },
};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /aïssatou/i }));
    await expect(canvas.getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
    await expect(canvas.getByRole("menuitem", { name: "Settings" })).toBeInTheDocument();
    await expect(canvas.getByRole("menuitem", { name: "Log out" })).toBeInTheDocument();
  },
};

export const LogsOut: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /aïssatou/i }));
    await userEvent.click(canvas.getByRole("menuitem", { name: "Log out" }));
  },
};
