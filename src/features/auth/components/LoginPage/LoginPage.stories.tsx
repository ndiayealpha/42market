import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LoginPage } from "./LoginPage";

const meta = {
  title: "Organisms/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 1280 }}>
        <Story />
      </div>
    ),
  ],
};

export const Tablet: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 820 }}>
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 390 }}>
        <Story />
      </div>
    ),
  ],
};
