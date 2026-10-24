import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FavoritesHeader } from "./FavoritesHeader";

const meta = {
  title: "Favorites/FavoritesHeader",
  component: FavoritesHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { cityName: "Saint-Étienne", availableCount: 12 },
} satisfies Meta<typeof FavoritesHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };
