import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from "@/src/components/atoms/Icon/Icon";

import { ProductImage } from "./ProductImage";

const meta = {
  title: "Atoms/ProductImage",
  component: ProductImage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    src: "/login-info-thumbnail.jpg",
    alt: "Étal de fruits et légumes frais",
    aspectRatio: "4/3",
  },
} satisfies Meta<typeof ProductImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProductImage {...args} />
    </div>
  ),
};

export const WithOverlays: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProductImage
        {...args}
        topLeft={<span className="rounded-full bg-surface/90 px-2 py-1 text-xs font-bold">15 min</span>}
        bottomRight={<Icon name="heart" size={20} className="rounded-full bg-surface/90 p-1 text-danger" />}
      />
    </div>
  ),
};

export const WithAllFourOverlays: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProductImage
        {...args}
        topLeft={<span className="rounded-full bg-catalog-danger px-2 py-1 text-xs font-bold text-white">-28%</span>}
        topRight={<Icon name="heart" size={20} className="rounded-full bg-surface/90 p-1 text-muted-foreground" />}
        bottomLeft={<span className="rounded-full bg-surface/90 px-2 py-1 text-xs font-bold">FRAIS</span>}
        bottomRight={<Icon name="plus" size={20} className="rounded-full bg-foreground-strong p-1 text-white" />}
      />
    </div>
  ),
};

export const MissingSource: Story = {
  args: { src: undefined, alt: "Avocat Hass Bio Calibre 12" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProductImage {...args} />
    </div>
  ),
};
