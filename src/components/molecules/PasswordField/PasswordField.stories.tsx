import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { PasswordField } from "./PasswordField";

const meta = {
  title: "Molecules/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Mot de passe",
    autoComplete: "current-password",
    defaultValue: "password123",
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordHidden: Story = {};

export const PasswordVisible: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /afficher le mot de passe/i }));
    await expect(canvas.getByLabelText("Mot de passe")).toHaveAttribute("type", "text");
  },
};

export const Error: Story = {
  args: { error: "Mot de passe incorrect." },
};
