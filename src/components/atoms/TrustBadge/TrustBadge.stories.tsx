import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TrustBadge } from "./TrustBadge";

const meta = {
  title: "Atoms/TrustBadge",
  component: TrustBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof TrustBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ssl: Story = {
  args: { icon: "shield", label: "Chiffrement 256-bit SSL" },
};

export const Rgpd: Story = {
  args: { icon: "shield", label: "Conforme RGPD & CNIL" },
};

export const CircularEconomy: Story = {
  args: { icon: "store", label: "Écosystème Circulaire" },
};
