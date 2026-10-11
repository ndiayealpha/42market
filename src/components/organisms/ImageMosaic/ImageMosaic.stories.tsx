import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";

import { FloatingBadge } from "@/src/components/molecules/FloatingBadge/FloatingBadge";
import { ImageMosaic } from "./ImageMosaic";

const meta = {
  title: "Organisms/ImageMosaic",
  component: ImageMosaic,
  tags: ["autodocs"],
  parameters: { layout: "padded", backgrounds: { default: "dark" } },
  args: {
    src: "/login-visual.png",
    alt: "Un commerçant partenaire dans son épicerie",
    width: 338,
    height: 431,
    className: "rounded-2xl",
  },
} satisfies Meta<typeof ImageMosaic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 338 }}>
      <ImageMosaic {...args} />
    </div>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <div style={{ width: 338 }}>
      <ImageMosaic {...args}>
        <FloatingBadge position="top-right" size={40}>
          <Image src="/login-badge.svg" alt="" width={40} height={40} />
        </FloatingBadge>
      </ImageMosaic>
    </div>
  ),
};
