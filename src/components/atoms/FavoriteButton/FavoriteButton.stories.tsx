import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { useFavorites } from "@/src/hooks/useFavorites";

import { FavoriteButton } from "./FavoriteButton";

/** Reads the real shared favorites store, same as every real caller (StoreHeaderCard, ProductCard) — not a static prop, so clicking it genuinely flips `aria-pressed` here too. */
function FavoriteButtonDemo(props: { itemId: string; label: string; tone?: "solid" | "surface" }) {
  const { favoriteIds } = useFavorites();
  return <FavoriteButton {...props} isFavorite={favoriteIds.has(props.itemId)} />;
}

const meta = {
  title: "Atoms/FavoriteButton",
  component: FavoriteButton,
  tags: ["autodocs"],
  args: { itemId: "demo-product", isFavorite: false, label: "Ajouter Mangues aux favoris" },
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SurfaceOff: Story = {};
export const SurfaceOn: Story = { args: { isFavorite: true } };
export const Solid: Story = { args: { tone: "solid", label: "Ajouter LoirIvoire aux favoris" } };

export const TogglesOnClick: Story = {
  render: (args) => <FavoriteButtonDemo itemId="favorite-button-demo-item" label={args.label} tone={args.tone} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    const before = button.getAttribute("aria-pressed");
    await userEvent.click(button);
    await expect(button).not.toHaveAttribute("aria-pressed", before ?? "");
  },
};
