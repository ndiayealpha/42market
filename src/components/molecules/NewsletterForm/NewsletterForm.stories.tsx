import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { NewsletterForm } from "./NewsletterForm";

const meta = {
  title: "Molecules/NewsletterForm",
  component: NewsletterForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof NewsletterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onSubscribe: fn() },
};

export const Submitted: Story = {
  args: { onSubscribe: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText("Votre adresse email..."), "jane@example.com");
    await userEvent.click(canvas.getByRole("button", { name: "S'inscrire" }));
    await expect(canvas.getByText(/merci/i)).toBeInTheDocument();
  },
};
