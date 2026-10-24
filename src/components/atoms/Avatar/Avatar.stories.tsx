import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from "@/src/components/atoms/Icon/Icon";

import { Avatar } from "./Avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Aïssatou D." },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/100?img=47" },
};

export const WithRingAndVipBadge: Story = {
  args: {
    size: 72,
    ring: true,
    badge: <Icon name="star" size={12} className="text-foreground-strong" />,
  },
};
