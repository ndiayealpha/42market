import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ACCOUNT_SETTINGS } from "@/src/data/account-settings.mock";

import { AccountSettingsSection } from "./AccountSettingsSection";

const meta = {
  title: "Profile/AccountSettingsSection",
  component: AccountSettingsSection,
  tags: ["autodocs"],
  args: { settings: ACCOUNT_SETTINGS, isLoading: false, isError: false },
} satisfies Meta<typeof AccountSettingsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true, settings: null } };
export const Error: Story = { args: { isError: true } };
