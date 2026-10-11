import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Testimonial } from "./Testimonial";

const meta = {
  title: "Molecules/Testimonial",
  component: Testimonial,
  tags: ["autodocs"],
  parameters: { layout: "padded", backgrounds: { default: "dark" } },
  args: {
    quote:
      "Grâce à 42 Markets je retrouve enfin les produits de mon enfance, livrés par de vrais commerçants du quartier.",
    author: "Aïssatou D., Lyon",
  },
  render: (args) => (
    <div style={{ width: 338 }}>
      <Testimonial {...args} />
    </div>
  ),
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
