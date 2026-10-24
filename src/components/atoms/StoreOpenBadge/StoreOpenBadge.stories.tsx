import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoreOpenBadge } from "./StoreOpenBadge";

const meta = {
  title: "Atoms/StoreOpenBadge",
  component: StoreOpenBadge,
  tags: ["autodocs"],
  args: { isOpen: true, label: "Ouvert • Ferme à 19h30" },
} satisfies Meta<typeof StoreOpenBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Closed: Story = { args: { isOpen: false, label: "Fermé • Ouvre à 08h00" } };
