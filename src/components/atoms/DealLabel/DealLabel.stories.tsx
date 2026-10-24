import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DealLabel } from "./DealLabel";

const meta = {
  title: "Atoms/DealLabel",
  component: DealLabel,
  tags: ["autodocs"],
  args: { text: "Offre lot", tone: "neutral" },
} satisfies Meta<typeof DealLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { text: "Anti-gaspi", tone: "success" } };
export const Warning: Story = { args: { text: "Prix dégressif", tone: "warning" } };
export const Danger: Story = { args: { text: "Vente flash", tone: "danger" } };
