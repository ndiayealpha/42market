import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { STORE_DETAIL } from "@/src/data/store-detail.mock";

import { StoreHeaderCard } from "./StoreHeaderCard";

const meta = {
  title: "StorePage/StoreHeaderCard",
  component: StoreHeaderCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    store: STORE_DETAIL,
    now: new Date("2026-08-12T12:00:00Z"), // Wednesday, within opening hours
  },
} satisfies Meta<typeof StoreHeaderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Closed: Story = {
  args: { now: new Date("2026-08-12T22:00:00Z") },
};

// Favorite state now comes from the shared favorites domain (`useFavorites`),
// not a prop — exercised here via the real toggle interaction instead of a
// static "Favorited" story.
export const TogglesFavorite: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heart = await canvas.findByRole("button", { name: /favoris/i });
    const before = heart.getAttribute("aria-pressed");
    await userEvent.click(heart);
    await expect(heart).not.toHaveAttribute("aria-pressed", before ?? "");
  },
};
