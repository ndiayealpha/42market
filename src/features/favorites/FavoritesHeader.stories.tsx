import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FavoritesHeader } from "./FavoritesHeader";

const meta = {
  title: "Favorites/FavoritesHeader",
  component: FavoritesHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { cityName: "Saint-Étienne", activeTab: "produits", counts: { products: 12, stores: 3, recipes: 3 } },
} satisfies Meta<typeof FavoritesHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };
