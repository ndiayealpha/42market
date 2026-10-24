import type { FavoriteKind } from "@/src/domain/favorites";

/**
 * Minimal favorites contract, extended (additively — `kind` is optional
 * everywhere, defaulting to "product") to back 3 independent favorite
 * lists (products, stores, recipes) instead of one flat set, for the
 * Favoris page's 3 tabs.
 */
export interface FavoritesRepository {
  getFavoriteIds(kind?: FavoriteKind): Promise<Set<string>>;
  setFavorite(itemId: string, isFavorite: boolean, kind?: FavoriteKind): Promise<void>;
}

// Module-level, not per-request — stands in for a real backend across
// calls within one session (same pattern as the profile page's mock
// notification-preferences store).
const favoriteIdsByKind: Record<FavoriteKind, Set<string>> = {
  product: new Set<string>([
    "fav-carottes-fanes",
    "fav-cereales-cerelac",
    "fav-pate-arachide-bonmafe",
    "fav-pois-dangole-1",
    "fav-petit-colas-sauvage",
    "fav-chips-plantain-salees",
    "fav-attieke-garba",
    "fav-piment-habanero-rouge",
    "fav-gombo-frais-extra",
    "fav-huile-rouge-carotene",
    "fav-gari-blanc-fin",
    "fav-soumbala-authentique",
  ]),
  // The store itself starts favorited, matching the existing fiche-boutique fixture. Slugs must exist in `STORE_PROMOS` (promotions.mock.ts) — the Favoris "Épiceries" tab joins against that list.
  store: new Set<string>(["loirivoire", "abidjan-market", "nimba-market"]),
  recipe: new Set<string>(["recette-thieboudienne", "recette-mafe-poulet", "recette-alloco-poisson"]),
};

export const mockFavoritesRepository: FavoritesRepository = {
  async getFavoriteIds(kind = "product") {
    return new Set(favoriteIdsByKind[kind]);
  },
  async setFavorite(itemId, isFavorite, kind = "product") {
    if (isFavorite) {
      favoriteIdsByKind[kind].add(itemId);
    } else {
      favoriteIdsByKind[kind].delete(itemId);
    }
  },
};
