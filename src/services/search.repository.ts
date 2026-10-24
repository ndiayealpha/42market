import { filterSearchGroups, normalizeSearchQuery, sortSearchGroups, type SearchFiltersState, type SearchResultsSummary } from "@/src/domain/search";
import {
  SEARCH_CAMPAIGN,
  SEARCH_CITY_LABEL,
  SEARCH_GROUPS,
  SEARCH_MATCHABLE_TERMS,
  SEARCH_TOTAL_RESULTS,
  SEARCH_TOTAL_STORES_WITH_RESULTS,
} from "@/src/data/search.mock";

export interface SearchRepository {
  search(query: string, filters: SearchFiltersState): Promise<SearchResultsSummary>;
}

/** Loose, partial, accent/case-insensitive — a real search backend would do far more; this only has to recognize the one reference query (and its close variants) the fixture was built for. */
function matchesFixture(normalizedQuery: string): boolean {
  if (!normalizedQuery) return false;
  const lowered = normalizedQuery.toLowerCase();
  return SEARCH_MATCHABLE_TERMS.some((term) => lowered.includes(term));
}

/**
 * Filters/sorts the one reference fixture server-side (domain helpers,
 * never ad hoc client logic — rule: URL-driven filters only). Note:
 * `filterSearchGroups` (finalized in `src/domain/search.ts`) only narrows
 * by `storeSlug` and `promoOnly` today — `pickupWithin2h` and `bulkOnly`
 * build correct chip hrefs/active-state but don't themselves narrow this
 * mock's results, a limitation inherited from the domain layer rather than
 * something this repository works around.
 */
export const mockSearchRepository: SearchRepository = {
  async search(query, filters) {
    const normalizedQuery = normalizeSearchQuery(query);

    if (!matchesFixture(normalizedQuery)) {
      return {
        query: normalizedQuery,
        totalResults: 0,
        totalStoresWithResults: 0,
        cityLabel: SEARCH_CITY_LABEL,
        groups: [],
      };
    }

    const groups = sortSearchGroups(filterSearchGroups(SEARCH_GROUPS, filters), filters.sort);

    return {
      query: normalizedQuery,
      totalResults: SEARCH_TOTAL_RESULTS,
      totalStoresWithResults: SEARCH_TOTAL_STORES_WITH_RESULTS,
      cityLabel: SEARCH_CITY_LABEL,
      campaign: SEARCH_CAMPAIGN,
      groups,
    };
  },
};
