import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { REFERENCE_STORE } from "@/src/data/profile.mock";

import { ReferenceStoreCard } from "./ReferenceStoreCard";

const NOW = new Date("2026-11-10T12:15:00Z");

const meta = {
  title: "Notifications/ReferenceStoreCard",
  component: ReferenceStoreCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  args: { store: REFERENCE_STORE, now: NOW, changeStoreHref: "/main/favoris?onglet=epiceries" },
} satisfies Meta<typeof ReferenceStoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoReferenceStore: Story = { args: { store: null } };
