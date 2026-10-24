import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SPONSORED_PARCEL } from "@/src/data/store-detail.mock";

import { SponsoredParcelBanner } from "./SponsoredParcelBanner";

const meta = {
  title: "StorePage/SponsoredParcelBanner",
  component: SponsoredParcelBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    parcel: SPONSORED_PARCEL,
  },
} satisfies Meta<typeof SponsoredParcelBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
