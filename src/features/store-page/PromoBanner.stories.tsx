import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PROMO_BANNER } from "@/src/data/store-detail.mock";

import { PromoBanner } from "./PromoBanner";

const meta = {
  title: "StorePage/PromoBanner",
  component: PromoBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    banner: PROMO_BANNER,
  },
} satisfies Meta<typeof PromoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
