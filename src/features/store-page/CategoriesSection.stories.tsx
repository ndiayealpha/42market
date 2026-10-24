import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CATEGORIES } from "@/src/data/store-detail.mock";

import { CategoriesSection } from "./CategoriesSection";

const meta = {
  title: "StorePage/CategoriesSection",
  component: CategoriesSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    categories: CATEGORIES,
    isLoading: false,
    isError: false,
    onRetry: fn(),
    viewAllHref: "/main/epiceries/loirivoire/rayons",
  },
} satisfies Meta<typeof CategoriesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActiveTile: Story = {
  args: { activeAisleId: "fruits", viewAllHref: undefined },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const ErrorState: Story = {
  args: { isError: true },
};

// No viewport addon is installed in this project, so the mobile state is
// demonstrated with a constrained container instead of a device frame.
export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
};
