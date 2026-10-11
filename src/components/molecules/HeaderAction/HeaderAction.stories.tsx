import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeaderAction } from "./HeaderAction";

const meta = {
  title: "Molecules/HeaderAction",
  component: HeaderAction,
  tags: ["autodocs"],
  args: {
    icon: "heart",
    label: "Favoris",
    href: "/main/favorites",
  },
} satisfies Meta<typeof HeaderAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Favorites: Story = {
  args: { icon: "heart", label: "Favoris", count: 4, badgeColor: "favorite" },
};

export const Notifications: Story = {
  args: { icon: "bell", label: "Notifications", href: "/main/notifications", count: 8, badgeColor: "danger" },
};

export const Basket: Story = {
  args: { icon: "basket", label: "Cabas", href: "/main/basket", count: 3, badgeColor: "basket" },
};

export const NoCount: Story = {
  args: { icon: "heart", label: "Favoris", count: 0 },
};
