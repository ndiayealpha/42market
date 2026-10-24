import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";

import { BannerCta } from "./BannerCta";

const meta = {
  title: "Layout/BannerCta",
  component: BannerCta,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    href: "#",
    children: "En savoir plus sur les départs",
  },
  decorators: [
    (Story) => (
      <BannerSurface tone="brown" className="inline-block p-6">
        <Story />
      </BannerSurface>
    ),
  ],
} satisfies Meta<typeof BannerCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { children: "Découvrir le rayon maraîcher", icon: <Icon name="arrow-right" size={16} /> },
};
