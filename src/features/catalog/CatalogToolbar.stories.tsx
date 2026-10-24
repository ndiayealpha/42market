import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CatalogToolbar } from "./CatalogToolbar";

const meta = {
  title: "Catalog/CatalogToolbar",
  component: CatalogToolbar,
  tags: ["autodocs"],
  args: { displayedCount: 24, totalCount: 240, isOpen: true, pickupMinutes: 15, sort: "populaires", onSortChange: fn() },
} satisfies Meta<typeof CatalogToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populaires: Story = {};
export const Nouveautes: Story = { args: { sort: "nouveautes" } };
export const StoreClosed: Story = { args: { isOpen: false } };
