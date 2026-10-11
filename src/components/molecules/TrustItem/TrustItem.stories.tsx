import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TrustItem } from "./TrustItem";

const meta = {
  title: "Molecules/TrustItem",
  component: TrustItem,
  tags: ["autodocs"],
} satisfies Meta<typeof TrustItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickAndCollect: Story = {
  args: {
    icon: "clock",
    title: "Click & Collect Garanti 2h",
    description: "Préparé avec soin par votre commerçant",
  },
};

export const Compliance: Story = {
  args: {
    icon: "shield",
    title: "Conforme DGCCRF & Traçabilité",
    description: "Réglementation sanitaire & origine certifiée",
  },
};

export const LocalSupport: Story = {
  args: {
    icon: "store",
    title: "Soutien au commerce local",
    description: "Circuit court et épiceries indépendantes",
  },
};
