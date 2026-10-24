import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { STORE_DETAIL } from "@/src/data/store-detail.mock";

import { HelpCard } from "./HelpCard";

const meta = {
  title: "Checkout/HelpCard",
  component: HelpCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HelpCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { supportPhone: STORE_DETAIL.phone },
};
