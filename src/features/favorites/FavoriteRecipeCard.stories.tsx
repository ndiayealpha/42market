import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FAVORITE_RECIPES } from "@/src/data/favorites.mock";

import { FavoriteRecipeCard } from "./FavoriteRecipeCard";

const meta = {
  title: "Favorites/FavoriteRecipeCard",
  component: FavoriteRecipeCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  args: { recipe: FAVORITE_RECIPES[0] },
} satisfies Meta<typeof FavoriteRecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
