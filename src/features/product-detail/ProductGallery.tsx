"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import type { ProductMedia } from "@/src/domain/product-detail";
import { useFavorites } from "@/src/hooks/useFavorites";

export interface ProductGalleryProps {
  productId: string;
  productName: string;
  media: ProductMedia[];
  isBioCertified: boolean;
  bioCertificationCode?: string;
  /** Precomputed by the view model (`computeDiscountPercent`) — the gallery never does its own price math. */
  discountPercent?: number;
}

const NON_PHOTO_THUMBNAIL_ICON: Record<Exclude<ProductMedia["kind"], "photo">, IconName> = {
  document: "archive",
  guide: "help-circle",
};

function firstPhotoIndex(media: ProductMedia[]): number {
  const index = media.findIndex((item) => item.kind === "photo");
  return index === -1 ? 0 : index;
}

function thumbnailLabel(item: ProductMedia): string {
  switch (item.kind) {
    case "photo":
      return item.alt;
    case "document":
    case "guide":
      return item.label;
    default: {
      const exhaustive: never = item;
      throw new Error(`Unhandled product media kind: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/**
 * The P2 hero image + thumbnail rail. Photo thumbnails swap the main
 * image; document/guide thumbnails open a placeholder `Dialog` (no real
 * file exists behind any of them yet — see Page P compte-rendu). `"use
 * client"`: owns gallery state and its own favorite toggle, same
 * self-contained pattern as `ProductCard`.
 */
export function ProductGallery({ productId, productName, media, isBioCertified, bioCertificationCode, discountPercent }: ProductGalleryProps) {
  const { favoriteIds } = useFavorites();
  const isFavorite = favoriteIds.has(productId);
  const favoriteLabel = isFavorite ? `Retirer ${productName} des favoris` : `Ajouter ${productName} aux favoris`;

  const [activeIndex, setActiveIndex] = useState(() => firstPhotoIndex(media));
  const [dialogMedia, setDialogMedia] = useState<Extract<ProductMedia, { kind: "document" | "guide" }> | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeMedia = media[activeIndex];
  const activeSrc = activeMedia?.kind === "photo" ? activeMedia.src : undefined;
  const activeAlt = activeMedia?.kind === "photo" ? activeMedia.alt : productName;

  function handleThumbnailActivate(index: number) {
    const item = media[index];
    if (!item) return;
    if (item.kind === "photo") {
      setActiveIndex(index);
    } else {
      setDialogMedia(item);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + media.length) % media.length;
    thumbnailRefs.current[nextIndex]?.focus();
  }

  const hasTopLeftBadges = isBioCertified || discountPercent != null;

  return (
    <div className="flex flex-col gap-3">
      <ProductImage
        src={activeSrc}
        alt={activeAlt ?? productName}
        aspectRatio="4/3"
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="rounded-2xl"
        topLeft={
          hasTopLeftBadges ? (
            <div className="flex flex-col items-start gap-1.5">
              {discountPercent != null && (
                <Chip tone="danger" size="sm" className="font-bold">
                  -{discountPercent}%
                </Chip>
              )}
              {isBioCertified && (
                <Badge color="success" uppercase={false}>
                  {bioCertificationCode ? `Bio • ${bioCertificationCode}` : "Bio"}
                </Badge>
              )}
            </div>
          ) : undefined
        }
        topRight={<FavoriteButton itemId={productId} isFavorite={isFavorite} label={favoriteLabel} kind="product" className="relative z-10" />}
      />

      {media.length > 1 && (
        <div role="group" aria-label="Autres vues du produit" className="flex gap-2">
          {media.map((item, index) => {
            const isActivePhoto = item.kind === "photo" && index === activeIndex;
            return (
              <button
                key={`${item.kind}-${index}`}
                ref={(node) => {
                  thumbnailRefs.current[index] = node;
                }}
                type="button"
                aria-pressed={item.kind === "photo" ? isActivePhoto : undefined}
                aria-label={thumbnailLabel(item)}
                onClick={() => handleThumbnailActivate(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${
                  isActivePhoto ? "border-foreground-strong" : "border-transparent"
                }`}
              >
                {item.kind === "photo" ? (
                  <Image src={item.src} alt="" aria-hidden fill sizes="64px" className="object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-catalog-chip">
                    <Icon name={NON_PHOTO_THUMBNAIL_ICON[item.kind]} size={20} className="text-catalog-faint" decorative />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <Dialog open={dialogMedia != null} onClose={() => setDialogMedia(null)} title={dialogMedia?.label ?? ""}>
        <p className="text-sm text-muted-foreground">
          {dialogMedia?.label} — à venir. Ce contenu n&apos;est pas encore disponible pour ce produit.
        </p>
      </Dialog>
    </div>
  );
}
