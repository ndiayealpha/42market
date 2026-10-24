import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ACTIVE_ORDER } from "@/src/data/orders.mock";

import { QrCodeDialog } from "./QrCodeDialog";

const meta = {
  title: "Profile/QrCodeDialog",
  component: QrCodeDialog,
  tags: ["autodocs"],
  args: { order: ACTIVE_ORDER, open: true, onClose: () => {} },
} satisfies Meta<typeof QrCodeDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
