import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { FavoriteRecipe } from "@/src/domain/favorites";

import { FavoriteRecipeCard } from "./FavoriteRecipeCard";

const SAMPLE_RECIPE: FavoriteRecipe = {
  id: "thieboudienne",
  name: "Thiéboudienne Rouge (Ceebu Jën)",
  servings: 4,
  totalPrice: 23,
  image: { src: "/login-visual.jpg", alt: "Thiéboudienne traditionnel" },
  href: "/main/recettes/thieboudienne-rouge-ceebu-jen",
  storeSlug: "loirivoire",
  storeName: "LoirIvoire",
  durationMinutes: 75,
  difficulty: "moyen",
  terroirRegion: "afrique-ouest",
};

const meta = {
  title: "Favorites/FavoriteRecipeCard",
  component: FavoriteRecipeCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  args: { recipe: SAMPLE_RECIPE },
} satisfies Meta<typeof FavoriteRecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
