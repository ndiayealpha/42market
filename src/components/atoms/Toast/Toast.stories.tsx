import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Toast } from "./Toast";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { message: "Préférences de notifications mises à jour.", tone: "success" },
};

export const Error: Story = {
  args: { message: "La mise à jour des notifications a échoué.", tone: "error" },
};
