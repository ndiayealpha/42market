import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BannerSurface } from "./BannerSurface";

const meta = {
  title: "Layout/BannerSurface",
  component: BannerSurface,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    children: <p className="p-6 text-sm">Contenu de la bannière</p>,
  },
} satisfies Meta<typeof BannerSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brown: Story = {
  args: { tone: "brown" },
};

export const Forest: Story = {
  args: { tone: "forest" },
};
