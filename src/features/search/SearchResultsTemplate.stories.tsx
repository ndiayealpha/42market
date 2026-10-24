import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { SEARCH_CAMPAIGN, SEARCH_CITY_LABEL, SEARCH_GROUPS, SEARCH_TOTAL_RESULTS, SEARCH_TOTAL_STORES_WITH_RESULTS } from "@/src/data/search.mock";

import { SearchResultsTemplate } from "./SearchResultsTemplate";

const DEFAULT_FILTERS = { pickupWithin2h: false, promoOnly: false, bulkOnly: false, storeSlug: "all" as const, sort: "distance" as const };

const meta = {
  title: "Search/SearchResultsTemplate",
  component: SearchResultsTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    query: "Bananes Plantains",
    isLoading: false,
    isError: false,
    onRetry: fn(),
    filters: DEFAULT_FILTERS,
    buildFilterHref: () => "/main/recherche?q=Bananes+Plantains",
    onSortChange: fn(),
    summary: {
      query: "Bananes Plantains",
      totalResults: SEARCH_TOTAL_RESULTS,
      totalStoresWithResults: SEARCH_TOTAL_STORES_WITH_RESULTS,
      cityLabel: SEARCH_CITY_LABEL,
      campaign: SEARCH_CAMPAIGN,
      groups: SEARCH_GROUPS,
    },
  },
} satisfies Meta<typeof SearchResultsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = { args: { isLoading: true, summary: undefined } };

export const ErrorState: Story = { args: { isError: true, summary: undefined } };

export const Empty: Story = {
  args: {
    query: "Caviar",
    summary: { query: "Caviar", totalResults: 0, totalStoresWithResults: 0, cityLabel: SEARCH_CITY_LABEL, groups: [] },
  },
};
