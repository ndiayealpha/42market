import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Sticker } from "./Sticker";

const meta = {
  title: "Atoms/Sticker",
  component: Sticker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: 240, height: 180, borderRadius: 16, background: "#EEEAE4" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    shape: "pill",
    bg: "var(--color-promo-red)",
    anchor: "top-right",
    rotate: 6,
    price: { amount: 9.88, oldAmount: 12.99 },
  },
} satisfies Meta<typeof Sticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PillPrice: Story = {};

export const CircleValue: Story = {
  args: { shape: "circle", anchor: "top-left", rotate: -8, price: undefined, value: "-30%", caption: "Remise" },
};

export const BottomRight: Story = {
  // Pre-existing, already-flagged AA failure (see Sticker.tsx's JSDoc):
  // white text on --promo-orange measures ~2.2:1, below the 4.5:1 (or
  // 3:1 large-text) AA minimum. Left as specified, not changed here —
  // `test: "todo"` keeps this known issue visible without failing CI.
  parameters: { a11y: { test: "todo" } },
  args: { anchor: "bottom-right", rotate: -3, bg: "#FF9500", price: { amount: 5.88, oldAmount: 8.99 } },
};
