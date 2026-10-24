import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import type { FavoriteKind } from "@/src/domain/favorites";
import { useToggleFavorite } from "@/src/hooks/useToggleFavorite";

export interface FavoriteButtonProps {
  itemId: string;
  isFavorite: boolean;
  /** Full accessible label, e.g. "Ajouter {produit} aux favoris" — built by the caller, which knows the item's name. */
  label: string;
  /** "solid": the store header's big colored-circle button. "surface": the small white corner button on a ProductCard. */
  tone?: "solid" | "surface";
  /** Which favorites list this toggles — defaults to "product", the only kind that existed before the Favoris page. */
  kind?: FavoriteKind;
  className?: string;
}

/**
 * The one favorite toggle used for a store (StoreHeaderCard), a product
 * (ProductCard) or a recipe — extracted from StoreHeaderCard's own ad hoc
 * heart IconButton so all 3 share the same optimistic-update/rollback/toast
 * behavior (`useToggleFavorite`) instead of local component state.
 */
export function FavoriteButton({ itemId, isFavorite, label, tone = "surface", kind = "product", className = "" }: FavoriteButtonProps) {
  const toggleFavorite = useToggleFavorite(kind);

  function handleClick() {
    toggleFavorite.mutate({ itemId, isFavorite: !isFavorite });
  }

  if (tone === "solid") {
    return (
      <IconButton
        icon="heart"
        size="lg"
        bg={isFavorite ? "var(--color-favorite)" : "var(--color-foreground-strong)"}
        fg="#FFFFFF"
        ariaLabel={label}
        aria-pressed={isFavorite}
        onClick={handleClick}
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={label}
      onClick={handleClick}
      className={`flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 shadow-[0_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-sm ${className}`}
    >
      <Icon name="heart" size={14} className={isFavorite ? "text-favorite" : "text-muted-foreground"} decorative />
    </button>
  );
}
