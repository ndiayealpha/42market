import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SignupPage } from "./SignupPage";

const meta = {
  title: "Features/Auth/SignupPage",
  component: SignupPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SignupPage>;

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
