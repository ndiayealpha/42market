import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FlashSaleEyebrow } from "./FlashSaleEyebrow";

const now = new Date("2026-11-10T10:00:00Z");

const meta = {
  title: "Catalog/FlashSaleEyebrow",
  component: FlashSaleEyebrow,
  tags: ["autodocs"],
  args: { flashSale: { endsAtIso: "2026-11-10T19:00:00Z" }, now },
} satisfies Meta<typeof FlashSaleEyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CeSoir: Story = {};
export const Demain: Story = { args: { flashSale: { endsAtIso: "2026-11-11T19:00:00Z" } } };
export const DateFuture: Story = { args: { flashSale: { endsAtIso: "2026-11-15T19:00:00Z" } } };
