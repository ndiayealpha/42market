import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { STORE_PROMOS } from "@/src/data/promotions.mock";

import { FavoriteStoreCard } from "./FavoriteStoreCard";

const meta = {
  title: "Favorites/FavoriteStoreCard",
  component: FavoriteStoreCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  args: { store: STORE_PROMOS[0] },
} satisfies Meta<typeof FavoriteStoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
