import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { ACCOUNT_SETTINGS } from "@/src/data/account-settings.mock";
import { PROFILE_DETAILS } from "@/src/data/profile.mock";

import { PreferencesSecuritySection } from "./PreferencesSecuritySection";

const meta = {
  title: "Profile/PreferencesSecuritySection",
  component: PreferencesSecuritySection,
  tags: ["autodocs"],
  args: {
    userId: PROFILE_DETAILS.id,
    security: ACCOUNT_SETTINGS.security,
    isSecurityLoading: false,
    isSecurityError: false,
  },
} satisfies Meta<typeof PreferencesSecuritySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isSecurityLoading: true, security: null } };
export const Error: Story = { args: { isSecurityError: true } };

export const TogglesNotifications: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = await canvas.findByRole("switch");
    await userEvent.click(toggle);
    await expect(toggle).toBeInTheDocument();
  },
};
