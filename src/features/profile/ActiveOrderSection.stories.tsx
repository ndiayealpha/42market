import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { ACTIVE_ORDER } from "@/src/data/orders.mock";

import { ActiveOrderSection } from "./ActiveOrderSection";

const meta = {
  title: "Profile/ActiveOrderSection",
  component: ActiveOrderSection,
  tags: ["autodocs"],
  args: { order: ACTIVE_ORDER, isLoading: false, isError: false },
} satisfies Meta<typeof ActiveOrderSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** No active order → the whole section renders nothing (rule 10: "section masquée"), not an empty-state message. */
export const SansCommandeEnCours: Story = { args: { order: null } };

export const Loading: Story = { args: { isLoading: true, order: null } };

export const OpensQrDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Afficher le QR Code/i }));
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
};
