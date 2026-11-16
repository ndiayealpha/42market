import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoreAvatarGroup } from "./StoreAvatarGroup";

const meta = {
  title: "Molecules/StoreAvatarGroup",
  component: StoreAvatarGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof StoreAvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleStore: Story = {
  args: { stores: [{ slug: "loirivoire", name: "LoirIvoire" }] },
};

export const TwoStores: Story = {
  args: {
    stores: [
      { slug: "nimba-market", name: "Nimba Market" },
      { slug: "elikya-market", name: "Elikya Market" },
    ],
  },
};

export const ThreeOrMoreStores: Story = {
  args: {
    stores: [
      { slug: "nimba-market", name: "Nimba Market" },
      { slug: "elikya-market", name: "Elikya Market" },
      { slug: "salam-market", name: "Salam Market" },
      { slug: "loirivoire", name: "LoirIvoire" },
    ],
  },
};
