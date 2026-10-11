import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Carousel } from "./Carousel";

interface Swatch {
  id: string;
  label: string;
  color: string;
}

const ITEMS: Swatch[] = Array.from({ length: 7 }, (_, i) => ({
  id: `item-${i}`,
  label: `Carte ${i + 1}`,
  color: ["#A5D7EF", "#F9CFDF", "#C4E89A", "#FFEEC7", "#420A27", "#EEEAE4", "#77BFE7"][i % 7],
}));

const DARK_SWATCHES = new Set(["#420A27"]);

const meta = {
  title: "Organisms/Carousel",
  component: Carousel<Swatch>,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: ITEMS,
    getKey: (item: Swatch) => item.id,
    renderItem: (item: Swatch) => (
      <div
        style={{
          width: 220,
          height: "100%",
          borderRadius: 16,
          background: item.color,
          color: DARK_SWATCHES.has(item.color) ? "#FFFFFF" : "#210D0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
        }}
      >
        {item.label}
      </div>
    ),
  },
} satisfies Meta<typeof Carousel<Swatch>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoRows: Story = {};

export const OneRow: Story = {
  args: { rows: 1, rowHeights: [180, 180] },
};
