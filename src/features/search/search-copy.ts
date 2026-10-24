/**
 * "N résultat(s) Click & Collect • M épicerie(s) partenaire(s) active(s) à
 * {ville}" — fr-FR pluralization, 0 treated as plural (same convention
 * already used by `formatRelativeTime`/`formatAddressesLabel` in
 * `src/lib/format.ts`). The one new pure formatter this page needs beyond
 * what `src/domain/search.ts` already provides.
 */
export function formatSearchResultsSummary(totalResults: number, totalStoresWithResults: number, cityLabel: string): string {
  const resultsLabel = totalResults === 1 ? "1 résultat" : `${totalResults} résultats`;
  const storesLabel = totalStoresWithResults === 1 ? "1 épicerie partenaire active" : `${totalStoresWithResults} épiceries partenaires actives`;
  return `${resultsLabel} Click & Collect • ${storesLabel} à ${cityLabel}`;
}

/**
 * Extracts the first "NN min" figure from a free-text pickup label —
 * "Retrait garanti sous 30 min • Ouvert jusqu'à 20h00" → 30, "Click &
 * Collect prêt en 15 min" → 15. Returns `null` when the label carries no
 * parseable minute figure (e.g. "Retrait dès 16h30 aujourd'hui") — used
 * only to show the "Retrait < 2h {n}" filter chip's indicative count, not
 * to actually narrow results (`filterSearchGroups`, finalized in
 * `src/domain/search.ts`, doesn't model this filter at all — see the
 * compte-rendu).
 */
export function parsePickupMinutes(pickupLabel: string): number | null {
  const match = pickupLabel.match(/(\d+)\s*min/);
  return match ? Number(match[1]) : null;
}
