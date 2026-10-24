import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TERROIR_SUGGESTION_LABEL } from "@/src/data/profile.mock";

import { AddTerroirCard } from "./AddTerroirCard";

const meta = {
  title: "Profile/AddTerroirCard",
  component: AddTerroirCard,
  tags: ["autodocs"],
  args: { suggestionLabel: TERROIR_SUGGESTION_LABEL },
  decorators: [(Story) => <ul className="max-w-xs"><Story /></ul>],
} satisfies Meta<typeof AddTerroirCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
