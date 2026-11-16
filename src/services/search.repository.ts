import { formatEditorialTag } from "@/src/domain/catalog";
import { searchArticles } from "@/src/domain/article";
import { searchRecipes } from "@/src/domain/recipe";
import {
  filterSearchGroups,
  normalizeSearchQuery,
  sortSearchGroups,
  type SearchCrossLink,
  type SearchFiltersState,
  type SearchResultsSummary,
  type SearchStoreGroup,
} from "@/src/domain/search";
import type { SearchResultProduct } from "@/src/domain/product-cards";
import { ARTICLES } from "@/src/data/articles.mock";
import {
  SEARCH_CAMPAIGN,
  SEARCH_CITY_LABEL,
  SEARCH_GROUPS,
  SEARCH_MATCHABLE_TERMS,
  SEARCH_TOTAL_RESULTS,
  SEARCH_TOTAL_STORES_WITH_RESULTS,
} from "@/src/data/search.mock";
import { PRODUCTS } from "@/src/data/catalog.mock";
import { STORE_DETAIL } from "@/src/data/store-detail.mock";
import { RECIPES } from "@/src/data/recipes.mock";
import { routes } from "@/src/lib/routing/routes";
import { formatDistance } from "@/src/lib/format";
import { foldAccents } from "@/src/lib/text";

export interface SearchRepository {
  search(query: string, filters: SearchFiltersState): Promise<SearchResultsSummary>;
}

/** Loose, partial, accent/case-insensitive — a real search backend would do far more; this only has to recognize the one reference query (and its close variants) the fixture was built for. */
function matchesFixture(normalizedQuery: string): boolean {
  if (!normalizedQuery) return false;
  const lowered = normalizedQuery.toLowerCase();
  return SEARCH_MATCHABLE_TERMS.some((term) => lowered.includes(term));
}

/** "Voir aussi dans le Carnet / Recettes" — real matches against the real recipe/article catalogs, independent of whether any product matched. */
function buildCrossLinks(normalizedQuery: string): SearchCrossLink[] {
  if (!normalizedQuery) return [];

  const matchingRecipes = searchRecipes(RECIPES, normalizedQuery).slice(0, 3);
  const matchingArticles = searchArticles(ARTICLES, normalizedQuery).slice(0, 3);

  return [
    ...matchingRecipes.map((recipe) => ({ label: `Recette : ${recipe.title}`, href: routes.main.recipeDetail(recipe.slug) })),
    ...matchingArticles.map((article) => ({ label: `Carnet du terroir : ${article.title}`, href: routes.main.carnetArticle(article.slug) })),
  ];
}

/**
 * Real substring match over the one genuinely populated catalog
 * (LoirIvoire's 24 products, `catalog.mock.ts`) — the fallback for any
 * query other than the hand-curated "Bananes Plantains" reference fixture,
 * so a search for e.g. "gombo" or "bissap" returns real results instead of
 * always falling through to the empty state. Other catalog stores have no
 * real product fixtures yet (same "loirivoire only" scope as
 * `StoreCatalogRepository`), so they can never appear here — not a bug,
 * just nothing to search.
 */
function searchRealCatalog(normalizedQuery: string): SearchStoreGroup[] {
  // An empty query must never fall through to `.includes("")`, which is
  // true for every product — that would silently dump the whole catalog
  // instead of surfacing the distinct "requête vide" state (rule 7).
  if (!normalizedQuery) return [];

  const folded = foldAccents(normalizedQuery);
  const matches = PRODUCTS.filter((product) => foldAccents(product.name).includes(folded));
  if (matches.length === 0) return [];

  const products: SearchResultProduct[] = matches.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    packagingLabel: product.packagingLabel,
    price: product.price,
    image: product.image,
    storeSlug: product.storeSlug,
    storeName: product.storeName,
    isOutOfStock: product.isOutOfStock,
    editorialTag: product.tag ? formatEditorialTag(product.tag) : undefined,
  }));

  return [
    {
      slug: STORE_DETAIL.id,
      name: "LoirIvoire Épicerie Fine",
      rating: { average: STORE_DETAIL.rating.average, reviewCount: STORE_DETAIL.rating.reviewCount },
      pickupLabel: "Click & Collect prêt en 15 min",
      distanceLabel: formatDistance(STORE_DETAIL.distanceKm * 1000),
      highlight: { kind: "neutral", text: "Résultat trouvé dans le catalogue de l'épicerie" },
      resultsLink: { kind: "catalog", totalCount: matches.length, href: routes.main.epicerieRayons(STORE_DETAIL.id) },
      products,
    },
  ];
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
    const crossLinks = buildCrossLinks(normalizedQuery);

    if (matchesFixture(normalizedQuery)) {
      const groups = sortSearchGroups(filterSearchGroups(SEARCH_GROUPS, filters), filters.sort);
      return {
        query: normalizedQuery,
        totalResults: SEARCH_TOTAL_RESULTS,
        totalStoresWithResults: SEARCH_TOTAL_STORES_WITH_RESULTS,
        cityLabel: SEARCH_CITY_LABEL,
        campaign: SEARCH_CAMPAIGN,
        groups,
        crossLinks,
      };
    }

    const realGroups = sortSearchGroups(filterSearchGroups(searchRealCatalog(normalizedQuery), filters), filters.sort);
    const totalResults = realGroups.reduce((sum, group) => sum + group.products.length, 0);

    return {
      query: normalizedQuery,
      totalResults,
      totalStoresWithResults: realGroups.length,
      cityLabel: SEARCH_CITY_LABEL,
      groups: realGroups,
      crossLinks,
    };
  },
};
