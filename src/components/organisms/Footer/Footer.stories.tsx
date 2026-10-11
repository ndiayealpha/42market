import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Footer } from "./Footer";

const meta = {
  title: "Organisms/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { year: 2026 },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Newsletter: Story = {
  args: { onSubscribe: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Footer renders both the desktop and mobile newsletter forms at
    // once (CSS, not JS, decides which is visible) — [0] is the desktop
    // one, which comes first in the DOM.
    await userEvent.type(canvas.getAllByPlaceholderText("Votre adresse email...")[0], "jane@example.com");
    await userEvent.click(canvas.getAllByRole("button", { name: "S'inscrire" })[0]);
    await expect(canvas.getByText(/merci/i)).toBeInTheDocument();
  },
};

// No viewport addon is installed in this project, so responsive states
// are demonstrated with a constrained container instead of a device frame.
export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Desktop: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 1280 }}>
        <Story />
      </div>
    ),
  ],
};
