import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SEARCH_GROUPS } from "@/src/data/search.mock";

import { StoreResultGroup } from "./StoreResultGroup";

const [NIMBA, LOIRIVOIRE, ABIDJAN] = SEARCH_GROUPS;

const meta = {
  title: "Search/StoreResultGroup",
  component: StoreResultGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    group: LOIRIVOIRE,
  },
} satisfies Meta<typeof StoreResultGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CatalogLink: Story = {};

export const SearchLink: Story = { args: { group: NIMBA } };

export const AisleLinkFewerProducts: Story = { args: { group: ABIDJAN } };
