import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Price } from "./Price";

const meta = {
  title: "Atoms/Price",
  component: Price,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    amount: 9.88,
    oldAmount: 12.99,
    layout: "inline",
    size: "sm",
    color: "#210D0B",
    oldColor: "#6B5E5D",
  },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {};

export const Stacked: Story = {
  // The gold accent is only ever used over the "bordeaux" theme's dark
  // card background (see PromoCard) — demoed here against that same
  // background rather than Storybook's white canvas, since the latter
  // would (correctly) fail color-contrast for a combination nothing
  // ever actually renders.
  decorators: [
    (Story) => (
      <div style={{ background: "#6A1736", padding: 24, borderRadius: 16, display: "inline-block" }}>
        <Story />
      </div>
    ),
  ],
  args: { layout: "stacked", size: "lg", prefix: "Lot", amount: 7.9, oldAmount: 12.5, color: "#FCD34D", oldColor: "rgba(255,255,255,.7)" },
};

export const NoDiscount: Story = {
  args: { oldAmount: undefined },
};
