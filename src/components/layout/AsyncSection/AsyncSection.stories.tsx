import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";

import { AsyncSection } from "./AsyncSection";

const meta = {
  title: "Layout/AsyncSection",
  component: AsyncSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    isLoading: false,
    isError: false,
    isEmpty: false,
    skeleton: <Skeleton width={320} height={120} />,
    onRetry: fn(),
    children: <p>Contenu chargé.</p>,
  },
} satisfies Meta<typeof AsyncSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Error: Story = {
  args: { isError: true },
};

export const Empty: Story = {
  args: { isEmpty: true },
};
