import type { Metadata } from "next";

import { normalizeSearchQuery } from "@/src/domain/search";
import { SearchResultsView } from "@/src/features/search/SearchResultsView";

interface PageProps {
  searchParams: Promise<{ q?: string; retrait?: string; promo?: string; gros?: string; epicerie?: string; tri?: string }>;
}

/** Dynamic title + always `noindex` — a free-text search results page is never a canonical destination for a search engine. */
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = normalizeSearchQuery(q ?? "");
  return {
    title: `Résultats pour « ${query} » | 42 Markets`,
    robots: { index: false, follow: false },
  };
}

/**
 * Public (like Page P and the global Bons Plans page) — no `verifySession`.
 * Being reachable without a session also requires the matching proxy-level
 * exception in `routes.ts` (`PROTECTED_EXCEPTIONS`), since `/main/recherche`
 * would otherwise be redirected to login by `proxy.ts` before this
 * component ever runs — see that file's comment for the same pattern
 * already used by `routes.main.bonsPlans`.
 *
 * `retrait`/`promo`/`gros`/`epicerie`/`tri` are re-read client-side by
 * `SearchResultsView` via `useSearchParams()` (same URL, same values) —
 * only `q` is needed here, for the metadata title.
 */
export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = normalizeSearchQuery(q ?? "");

  return <SearchResultsView query={query} />;
}
