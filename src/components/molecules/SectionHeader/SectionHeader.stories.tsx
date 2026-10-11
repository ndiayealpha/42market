import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Molecules/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    kicker: "Bons plans du quartier & Arrivages",
    title: "Offres en cours & Arrivages",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Live: Story = {
  args: { live: true, meta: "Mis à jour en direct · 20 offres actives à Saint-Étienne" },
};

export const WithActions: Story = {
  args: {
    live: true,
    meta: "Mis à jour en direct · 20 offres actives à Saint-Étienne",
    actions: <span style={{ fontSize: 14, fontWeight: 600 }}>Voir tout (20)</span>,
  },
};
