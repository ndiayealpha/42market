import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InfoTile } from "./InfoTile";

const meta = {
  title: "Molecules/InfoTile",
  component: InfoTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { icon: "shield", title: "Chaîne du froid 100% préservée", subtitle: "Casier réfrigéré 3°C" },
} satisfies Meta<typeof InfoTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {};
export const Tile: Story = { args: { layout: "tile" } };
export const CardStacked: Story = { args: { layout: "card-stacked", title: "Click & Collect Garanti 2h", subtitle: "Préparé avec soin par votre commerçant" } };
