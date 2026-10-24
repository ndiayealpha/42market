import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { StoreSwitchConfirmDialog } from "./StoreSwitchConfirmDialog";

const meta = {
  title: "Molecules/StoreSwitchConfirmDialog",
  component: StoreSwitchConfirmDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onClose: fn(),
    onConfirm: fn(),
    children: "Votre cabas contient des articles de LoirIvoire. Changer d'épicerie videra votre cabas actuel.",
  },
} satisfies Meta<typeof StoreSwitchConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomConfirmLabel: Story = { args: { confirmLabel: "Confirmer" } };
