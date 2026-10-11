import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CountdownBar } from "./CountdownBar";

const meta = {
  title: "Organisms/CountdownBar",
  component: CountdownBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    targetDate: new Date(Date.now() + (6 * 3600 + 40 * 60 + 32) * 1000),
    onCtaClick: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof CountdownBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EndingSoon: Story = {
  args: { targetDate: new Date(Date.now() + 45 * 1000) },
};

export const CustomLabels: Story = {
  args: { label: "Vente flash", ctaLabel: "J'en profite" },
};
