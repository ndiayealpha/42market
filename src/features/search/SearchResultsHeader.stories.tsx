import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SearchResultsHeader } from "./SearchResultsHeader";

const meta = {
  title: "Search/SearchResultsHeader",
  component: SearchResultsHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    query: "Bananes Plantains",
    totalResults: 38,
    totalStoresWithResults: 4,
    cityLabel: "Saint-Étienne",
  },
} satisfies Meta<typeof SearchResultsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingularCounts: Story = {
  args: { query: "Attiéké", totalResults: 1, totalStoresWithResults: 1 },
};

export const LongQuery: Story = {
  args: { query: "Bananes plantains vertes bio sans traitement chimique en vrac au kilo" },
};

export const NoResults: Story = {
  args: { query: "Caviar", totalResults: 0, totalStoresWithResults: 0 },
};
