import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TERROIR_SUGGESTION_LABEL, TERROIRS } from "@/src/data/profile.mock";

import { TerroirsSection } from "./TerroirsSection";

const meta = {
  title: "Profile/TerroirsSection",
  component: TerroirsSection,
  tags: ["autodocs"],
  args: {
    terroirs: TERROIRS,
    suggestionLabel: TERROIR_SUGGESTION_LABEL,
    isLoading: false,
    isError: false,
    editHref: "/main/profile/modifier",
  },
} satisfies Meta<typeof TerroirsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { terroirs: [] } };
export const Loading: Story = { args: { isLoading: true } };
export const Error: Story = { args: { isError: true } };
