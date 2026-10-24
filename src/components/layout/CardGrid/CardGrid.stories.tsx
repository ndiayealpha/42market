import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CardGrid } from "./CardGrid";

function DemoTile({ label }: { label: string }) {
  return (
    <li className="flex h-24 items-center justify-center rounded-xl bg-catalog-chip text-sm font-semibold text-foreground-strong">
      {label}
    </li>
  );
}

const meta = {
  title: "Layout/CardGrid",
  component: CardGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: Array.from({ length: 6 }, (_, index) => <DemoTile key={index} label={`${index + 1}`} />),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    children: Array.from({ length: 8 }, (_, index) => <DemoTile key={index} label={`${index + 1}`} />),
  },
};

export const SixColumns: Story = {
  args: {
    columns: 6,
    children: Array.from({ length: 12 }, (_, index) => <DemoTile key={index} label={`${index + 1}`} />),
  },
};
