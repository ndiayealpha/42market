"use client";

import { useQuery } from "@tanstack/react-query";

import type { FavoriteKind } from "@/src/domain/favorites";
import { mockFavoritesRepository } from "@/src/services/favorites.repository";

function favoritesKey(kind: FavoriteKind) {
  return ["favorites", kind] as const;
}

export function useFavorites(kind: FavoriteKind = "product") {
  const query = useQuery({
    queryKey: favoritesKey(kind),
    queryFn: () => mockFavoritesRepository.getFavoriteIds(kind),
  });
  return { favoriteIds: query.data ?? new Set<string>(), isLoading: query.isPending };
}

export { favoritesKey };
