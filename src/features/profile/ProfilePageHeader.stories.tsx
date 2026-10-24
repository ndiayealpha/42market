import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProfilePageHeader } from "./ProfilePageHeader";

const meta = {
  title: "Profile/ProfilePageHeader",
  component: ProfilePageHeader,
  tags: ["autodocs"],
  args: { isVerified: true, preferencesAnchor: "#preferences-securite" },
} satisfies Meta<typeof ProfilePageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {};
export const Unverified: Story = { args: { isVerified: false } };
