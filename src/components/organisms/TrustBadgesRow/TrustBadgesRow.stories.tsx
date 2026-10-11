import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TrustBadgesRow } from "./TrustBadgesRow";

const meta = {
  title: "Organisms/TrustBadgesRow",
  component: TrustBadgesRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof TrustBadgesRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { icon: "shield", label: "Chiffrement 256-bit SSL" },
      { icon: "shield", label: "Conforme RGPD & CNIL" },
      { icon: "store", label: "Écosystème Circulaire" },
    ],
  },
};
