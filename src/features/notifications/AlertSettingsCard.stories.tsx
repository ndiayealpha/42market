import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AlertSettingsCard } from "./AlertSettingsCard";

const meta = {
  title: "Notifications/AlertSettingsCard",
  component: AlertSettingsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  args: { userId: "1", isPhoneVerified: true },
} satisfies Meta<typeof AlertSettingsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PhoneNotVerified: Story = { args: { isPhoneVerified: false } };
export const OtherAccountDefaults: Story = { args: { userId: "2" } };
