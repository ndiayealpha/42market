import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Header } from "./Header";

const meta = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    onLocationClick: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoggedIn: Story = {
  args: {
    user: { name: "Aïssatou D.", tier: "Club Terroir Gold" },
  },
};

export const WithNotifications: Story = {
  args: {
    user: { name: "Aïssatou D.", tier: "Club Terroir Gold" },
    actions: [
      { key: "favorites", icon: "heart", label: "Favoris", href: "/main/favoris", count: 4, badgeColor: "favorite" },
      {
        key: "notifications",
        icon: "bell",
        label: "Notifications",
        href: "/main/notifications",
        count: 8,
        badgeColor: "danger",
      },
      { key: "basket", icon: "basket", label: "Cabas", href: "/main/cabas", badgeColor: "basket" },
    ],
  },
};

export const WithBasketItems: Story = {
  args: {
    user: { name: "Aïssatou D.", tier: "Club Terroir Gold" },
    actions: [
      { key: "favorites", icon: "heart", label: "Favoris", href: "/main/favoris", badgeColor: "favorite" },
      { key: "notifications", icon: "bell", label: "Notifications", href: "/main/notifications", badgeColor: "danger" },
      { key: "basket", icon: "basket", label: "Cabas", href: "/main/cabas", count: 3, badgeColor: "basket" },
    ],
  },
};

export const DifferentLocation: Story = {
  args: {
    user: { name: "Aïssatou D.", tier: "Club Terroir Gold" },
    location: { location: "75001, FR", radiusLabel: "Rayon 10 km" },
  },
};

// No viewport addon is installed in this project, so the mobile state is
// demonstrated with a constrained container instead of a device frame.
export const Mobile: Story = {
  args: { user: { name: "Aïssatou D.", tier: "Club Terroir Gold" } },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
};
