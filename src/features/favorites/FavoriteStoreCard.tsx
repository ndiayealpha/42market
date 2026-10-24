import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import type { StorePromoSummary } from "@/src/domain/promotions";
import { useFavorites } from "@/src/hooks/useFavorites";
import { StorePromoCard } from "@/src/features/catalog/StorePromoCard";

export interface FavoriteStoreCardProps {
  store: StorePromoSummary;
}

/** F6 (minimal, unmaquetted) — reuses `StorePromoCard`'s `bottomLeft` slot for the un-favorite heart (both top corners and bottom-right are already its own badges). */
export function FavoriteStoreCard({ store }: FavoriteStoreCardProps) {
  const { favoriteIds } = useFavorites("store");
  const isFavorite = favoriteIds.has(store.slug);

  return (
    <StorePromoCard
      store={store}
      bottomLeft={
        <FavoriteButton
          itemId={store.slug}
          isFavorite={isFavorite}
          label={isFavorite ? `Retirer ${store.name} des favoris` : `Ajouter ${store.name} aux favoris`}
          kind="store"
          className="relative z-10"
        />
      }
    />
  );
}
