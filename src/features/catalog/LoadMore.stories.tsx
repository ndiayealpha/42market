import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { LoadMore } from "./LoadMore";

const meta = {
  title: "Catalog/LoadMore",
  component: LoadMore,
  tags: ["autodocs"],
  args: {
    displayedCount: 24,
    totalCount: 240,
    cityName: "Saint-Étienne",
    hasMore: true,
    isLoading: false,
    isError: false,
    onLoadMore: fn(),
  },
} satisfies Meta<typeof LoadMore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {};
export const Loading: Story = { args: { isLoading: true } };
export const ErrorState: Story = { args: { isError: true } };
export const AllLoaded: Story = { args: { hasMore: false, displayedCount: 240 } };
