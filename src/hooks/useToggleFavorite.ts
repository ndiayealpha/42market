"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { FavoriteKind } from "@/src/domain/favorites";
import { mockFavoritesRepository } from "@/src/services/favorites.repository";
import { useToast } from "@/src/providers/toast-provider";

import { favoritesKey } from "./useFavorites";

/** Optimistic toggle with rollback on failure + toast feedback — shared by every `FavoriteButton` (store, product, or recipe). */
export function useToggleFavorite(kind: FavoriteKind = "product") {
  const queryClient = useQueryClient();
  const toast = useToast();
  const key = favoritesKey(kind);

  return useMutation({
    mutationFn: ({ itemId, isFavorite }: { itemId: string; isFavorite: boolean }) =>
      mockFavoritesRepository.setFavorite(itemId, isFavorite, kind),
    onMutate: async ({ itemId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Set<string>>(key);
      const next = new Set(previous);
      if (isFavorite) next.add(itemId);
      else next.delete(itemId);
      queryClient.setQueryData(key, next);
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast.show("La mise à jour des favoris a échoué.", "error");
    },
  });
}
