import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NotificationCategoryChips } from "./NotificationCategoryChips";

const meta = {
  title: "Notifications/NotificationCategoryChips",
  component: NotificationCategoryChips,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    active: "all",
    totalCount: 12,
    byCategory: [
      { category: "arrivages-stocks", total: 4, unread: 2 },
      { category: "ventes-flash", total: 2, unread: 1 },
      { category: "recettes", total: 1, unread: 0 },
      { category: "avis-epiceries", total: 5, unread: 0 },
    ],
    getCategoryHref: (category: string) => `/main/notifications?categorie=${category}`,
  },
} satisfies Meta<typeof NotificationCategoryChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CategoryActive: Story = { args: { active: "ventes-flash" } };
