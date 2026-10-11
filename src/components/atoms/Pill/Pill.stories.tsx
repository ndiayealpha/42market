import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Pill } from "./Pill";

const meta = {
  title: "Atoms/Pill",
  component: Pill,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Bons plans semaine",
    variant: "badge",
    bg: "#7924B8",
    fg: "#FFFFFF",
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Badge: Story = {};

export const BadgeWithSecondaryLabel: Story = {
  args: { secondaryLabel: "Jusqu'au 15 juin" },
};

export const BadgeWithIcon: Story = {
  args: { icon: "zap", label: "Arrivages fret express", bg: "rgba(255,255,255,.2)", fg: "#FFFFFF", iconColor: "#FCD34D" },
};

export const Tag: Story = {
  args: { variant: "tag", label: "Click & Collect 10 min", bg: "#DFF0FA", fg: "#1F3953" },
};
