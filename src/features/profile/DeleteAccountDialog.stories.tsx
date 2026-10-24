import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { DeleteAccountDialog } from "./DeleteAccountDialog";

const meta = {
  title: "Profile/DeleteAccountDialog",
  component: DeleteAccountDialog,
  tags: ["autodocs"],
  args: { open: true, onClose: fn(), onConfirm: fn(), isPending: false },
} satisfies Meta<typeof DeleteAccountDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Pending: Story = { args: { isPending: true } };
