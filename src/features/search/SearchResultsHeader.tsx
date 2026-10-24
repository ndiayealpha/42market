import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { routes } from "@/src/lib/routing/routes";

import { formatSearchResultsSummary } from "./search-copy";

export interface SearchResultsHeaderProps {
  query: string;
  totalResults: number;
  totalStoresWithResults: number;
  cityLabel: string;
}

/** A long query stays readable in the breadcrumb trail — same cap `normalizeSearchQuery` already applies to stored queries (80 chars), with an ellipsis so truncation is visible. */
function truncateForBreadcrumb(query: string, max = 40): string {
  return query.length > max ? `${query.slice(0, max - 1).trimEnd()}…` : query;
}

/** R1 — breadcrumb, the page's (visually hidden) `<h1>`, and the "N résultats • M épiceries" line. */
export function SearchResultsHeader({ query, totalResults, totalStoresWithResults, cityLabel }: SearchResultsHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Recherche", href: routes.main.search },
          { label: `« ${truncateForBreadcrumb(query)} »` },
        ]}
      />
      <h1 className="sr-only">Résultats pour « {query} »</h1>
      <p className="flex items-center gap-2 text-sm text-ink-muted">
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-success" />
        {formatSearchResultsSummary(totalResults, totalStoresWithResults, cityLabel)}
      </p>
    </div>
  );
}
