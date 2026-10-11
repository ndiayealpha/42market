import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FooterAccordion } from "./FooterAccordion";

const meta = {
  title: "Molecules/FooterAccordion",
  component: FooterAccordion,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ width: 358 }}>
      <FooterAccordion {...args} />
    </div>
  ),
  args: {
    title: "Découvrir",
    children: (
      <ul className="flex flex-col gap-3 text-sm">
        <li>À propos de 42 markets</li>
        <li>Comment ça marche</li>
        <li>Nouveautés</li>
        <li>Promotions</li>
      </ul>
    ),
  },
} satisfies Meta<typeof FooterAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};
