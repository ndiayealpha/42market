"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import type { ProductMedia } from "@/src/domain/product-detail";
import { useFavorites } from "@/src/hooks/useFavorites";

import {
  ProductGalleryLightbox,
  type ProductGalleryLightboxSlide,
} from "./ProductGalleryLightbox";

export interface ProductGalleryProps {
  productId: string;
  productName: string;
  media: ProductMedia[];
  isBioCertified: boolean;
  bioCertificationCode?: string;
  /** Precomputed by the view model (`computeDiscountPercent`) — the gallery never does its own price math. */
  discountPercent?: number;
  isOutOfStock?: boolean;
}

type GallerySlide = Extract<
  ProductMedia,
  { kind: "photo" } | { kind: "video" }
>;
type AuxMedia = Extract<ProductMedia, { kind: "document" } | { kind: "guide" }>;

const MAX_THUMBNAILS = 5;
const FADE_MS = 90;

const AUX_THUMBNAIL_ICON: Record<AuxMedia["kind"], IconName> = {
  document: "archive",
  guide: "help-circle",
};

function isGallerySlide(item: ProductMedia): item is GallerySlide {
  return item.kind === "photo" || item.kind === "video";
}

/** Packshot (the first real photo) opens the gallery — never a document/guide/video, falling back to the first slide of any kind if there's no photo at all. */
function firstGallerySlideIndex(media: ProductMedia[]): number {
  const photoIndex = media.findIndex((item) => item.kind === "photo");
  if (photoIndex !== -1) return photoIndex;
  return media.findIndex(isGallerySlide);
}

function thumbnailLabel(item: ProductMedia): string {
  switch (item.kind) {
    case "photo":
    case "video":
      return item.alt;
    case "document":
    case "guide":
      return item.label;
    default: {
      const exhaustive: never = item;
      throw new Error(
        `Unhandled product media kind: ${JSON.stringify(exhaustive)}`,
      );
    }
  }
}

/** The video's thumbnail always comes last, regardless of its position in `media` — every other item (photo, document, guide) keeps its original relative order. */
function orderThumbnails(
  media: ProductMedia[],
): { item: ProductMedia; index: number }[] {
  const indexed = media.map((item, index) => ({ item, index }));
  return [
    ...indexed.filter(({ item }) => item.kind !== "video"),
    ...indexed.filter(({ item }) => item.kind === "video"),
  ];
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The P2 hero image + thumbnail rail, now with prev/next, a counter, a
 * lightbox and video support. `"use client"`: owns gallery state and its
 * own favorite toggle, same self-contained pattern as `ProductCard`.
 *
 * Layout: DOM order is [main image, thumbnails] so a screen reader or
 * keyboard-only visitor meets the image first; `lg:flex-row-reverse`
 * flips that visually to "miniatures à gauche, grande image à droite" at
 * desktop widths without reordering the DOM. Below `lg`, thumbnails sit
 * in a plain horizontal row under the image — capped at `MAX_THUMBNAILS`
 * so it's never a container that scrolls (project rule: no list
 * container scrolls internally).
 */
export function ProductGallery({
  productId,
  productName,
  media,
  isBioCertified,
  bioCertificationCode,
  discountPercent,
  isOutOfStock = false,
}: ProductGalleryProps) {
  const { favoriteIds } = useFavorites();
  const isFavorite = favoriteIds.has(productId);
  const favoriteLabel = isFavorite
    ? `Retirer ${productName} des favoris`
    : `Ajouter ${productName} aux favoris`;

  const [activeIndex, setActiveIndex] = useState(() =>
    firstGallerySlideIndex(media),
  );
  const [initialIndex] = useState(activeIndex);
  const [isFading, setIsFading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  const [dialogMedia, setDialogMedia] = useState<AuxMedia | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const gallerySlides = media
    .map((item, index) => ({ item, index }))
    .filter((entry): entry is { item: GallerySlide; index: number } =>
      isGallerySlide(entry.item),
    );
  const slidePosition =
    Math.max(
      gallerySlides.findIndex((slide) => slide.index === activeIndex),
      0,
    ) + 1;

  const activeItem = media[activeIndex];
  const activePhoto = activeItem?.kind === "photo" ? activeItem : undefined;

  const thumbnails = orderThumbnails(media);
  const visibleThumbnails = thumbnails.slice(0, MAX_THUMBNAILS);
  const overflowCount = thumbnails.length - visibleThumbnails.length;

  function changeActiveIndex(nextIndex: number) {
    if (nextIndex === activeIndex) return;
    if (media[nextIndex]?.kind === "photo") setIsPhotoLoading(true);
    if (prefersReducedMotion()) {
      setActiveIndex(nextIndex);
      return;
    }
    setIsFading(true);
    window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setIsFading(false);
    }, FADE_MS);
  }

  function stepSlide(direction: 1 | -1) {
    if (gallerySlides.length <= 1) return;
    const currentPosition = gallerySlides.findIndex(
      (slide) => slide.index === activeIndex,
    );
    const nextPosition =
      (currentPosition + direction + gallerySlides.length) %
      gallerySlides.length;
    changeActiveIndex(gallerySlides[nextPosition].index);
  }

  function handleThumbnailActivate(
    entry: { item: ProductMedia; index: number },
    isOverflowSlot: boolean,
  ) {
    if (isOverflowSlot) {
      setLightboxOpen(true);
      return;
    }
    if (isGallerySlide(entry.item)) {
      changeActiveIndex(entry.index);
    } else {
      setDialogMedia(entry.item);
    }
  }

  function handleThumbnailKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    position: number,
  ) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextPosition =
      (position + direction + visibleThumbnails.length) %
      visibleThumbnails.length;
    thumbnailRefs.current[nextPosition]?.focus();
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const end = event.changedTouches[0];
    const deltaX = end.clientX - start.x;
    const deltaY = end.clientY - start.y;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      stepSlide(deltaX < 0 ? 1 : -1);
    }
  }

  const hasTopLeftBadges =
    isOutOfStock || isBioCertified || discountPercent != null;
  const lightboxSlides: ProductGalleryLightboxSlide[] = gallerySlides.map(
    ({ item }) =>
      item.kind === "photo"
        ? { kind: "photo", src: item.src, alt: item.alt }
        : { kind: "video", src: item.src, alt: item.alt, poster: item.poster },
  );
  const lightboxActiveIndex = Math.max(
    gallerySlides.findIndex((slide) => slide.index === activeIndex),
    0,
  );

  return (
    <div
      role="group"
      aria-roledescription="carrousel"
      aria-label={`Galerie photo : ${productName}`}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3 lg:flex-row-reverse">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div
            className="group relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activeItem?.kind === "video" ? (
              <div
                className="relative overflow-hidden rounded-2xl bg-catalog-chip"
                style={{ aspectRatio: "4/3" }}
              >
                <video
                  key={activeIndex}
                  src={activeItem.src}
                  poster={activeItem.poster}
                  controls
                  playsInline
                  className={`h-full w-full object-cover transition-opacity duration-150 ${isFading ? "opacity-0" : "opacity-100"} motion-reduce:transition-none`}
                />
              </div>
            ) : (
              <ProductImage
                key={activeIndex}
                src={activePhoto?.src}
                alt={activePhoto?.alt ?? productName}
                aspectRatio="4/3"
                priority={activeIndex === initialIndex}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`rounded-2xl transition-opacity duration-150 ${isFading ? "opacity-0" : "opacity-100"} motion-reduce:transition-none`}
                onLoad={() => setIsPhotoLoading(false)}
                onError={() => setIsPhotoLoading(false)}
              />
            )}

            {isPhotoLoading && activePhoto?.src && (
              <Skeleton width="100%" height="100%" radius="2xl" className="absolute inset-0" />
            )}

            {hasTopLeftBadges && (
              <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1.5">
                {isOutOfStock && (
                  <Chip tone="danger" size="sm" className="font-bold">
                    Indisponible
                  </Chip>
                )}
                {discountPercent != null && (
                  <Chip tone="danger" size="sm" className="font-bold">
                    -{discountPercent}%
                  </Chip>
                )}
                {isBioCertified && (
                  <Badge color="success" uppercase={false}>
                    {bioCertificationCode
                      ? `Bio • ${bioCertificationCode}`
                      : "Bio"}
                  </Badge>
                )}
              </div>
            )}

            <div className="absolute right-2 top-2 flex flex-col items-end gap-2">
              <FavoriteButton
                itemId={productId}
                isFavorite={isFavorite}
                label={favoriteLabel}
                kind="product"
                className="relative z-10"
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Agrandir l'image"
                className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 shadow-[0_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-sm"
              >
                <Icon
                  name="zoom-in"
                  size={14}
                  className="text-muted-foreground"
                  decorative
                />
              </button>
            </div>

            {gallerySlides.length > 1 && (
              <>
                <span
                  aria-hidden
                  className="absolute bottom-2 right-2 hidden rounded-full bg-foreground-strong/70 px-2 py-0.5 text-xs font-semibold text-white sm:block"
                >
                  {slidePosition}/{gallerySlides.length}
                </span>
                <div className="absolute left-2 top-1/2 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none lg:block">
                  <IconButton
                    icon="chevron-left"
                    size="md"
                    bg="var(--color-surface)"
                    fg="var(--color-foreground-strong)"
                    ariaLabel="Image précédente"
                    onClick={() => stepSlide(-1)}
                    className="shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  />
                </div>
                <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none lg:block">
                  <IconButton
                    icon="chevron-right"
                    size="md"
                    bg="var(--color-surface)"
                    fg="var(--color-foreground-strong)"
                    ariaLabel="Image suivante"
                    onClick={() => stepSlide(1)}
                    className="shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  />
                </div>
                <div aria-live="polite" className="sr-only">
                  {`Image ${slidePosition} sur ${gallerySlides.length}`}
                </div>
              </>
            )}
          </div>

          {gallerySlides.length > 1 && (
            <div
              role="tablist"
              aria-label="Pages de la galerie"
              className="flex items-center justify-center gap-1.5 sm:hidden"
            >
              {gallerySlides.map((slide, position) => (
                <button
                  key={slide.index}
                  type="button"
                  role="tab"
                  aria-label={`Image ${position + 1} sur ${gallerySlides.length}`}
                  aria-selected={slide.index === activeIndex}
                  onClick={() => changeActiveIndex(slide.index)}
                  className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                    slide.index === activeIndex
                      ? "w-6 bg-foreground-strong"
                      : "w-2 bg-dot-idle"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {thumbnails.length > 1 && (
          <div
            role="group"
            aria-label="Autres vues du produit"
            className="flex flex-row gap-2 lg:w-[72px] lg:flex-col"
          >
            {visibleThumbnails.map((entry, position) => {
              const { item, index } = entry;
              const isOverflowSlot =
                overflowCount > 0 && position === visibleThumbnails.length - 1;
              const isActivePhoto =
                isGallerySlide(item) && index === activeIndex;

              return (
                <button
                  key={`${item.kind}-${index}`}
                  ref={(node) => {
                    thumbnailRefs.current[position] = node;
                  }}
                  type="button"
                  aria-pressed={
                    isGallerySlide(item) ? isActivePhoto : undefined
                  }
                  aria-current={isActivePhoto ? "true" : undefined}
                  aria-label={
                    isOverflowSlot
                      ? `Voir ${overflowCount} photo${overflowCount > 1 ? "s" : ""} de plus`
                      : thumbnailLabel(item)
                  }
                  onClick={() => handleThumbnailActivate(entry, isOverflowSlot)}
                  onKeyDown={(event) => handleThumbnailKeyDown(event, position)}
                  className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border-2 ${
                    isActivePhoto
                      ? "border-foreground-strong"
                      : "border-transparent"
                  } ${!isActivePhoto ? "opacity-60" : ""}`}
                >
                  {item.kind === "photo" && (
                    <Image
                      src={item.src}
                      alt=""
                      aria-hidden
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  )}
                  {item.kind === "video" && (
                    <>
                      <Image
                        src={item.poster}
                        alt=""
                        aria-hidden
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-foreground-strong/30">
                        <Icon
                          name="play"
                          size={20}
                          className="text-white"
                          decorative
                        />
                      </span>
                    </>
                  )}
                  {(item.kind === "document" || item.kind === "guide") && (
                    <span className="flex h-full w-full items-center justify-center bg-catalog-chip">
                      <Icon
                        name={AUX_THUMBNAIL_ICON[item.kind]}
                        size={20}
                        className="text-catalog-faint"
                        decorative
                      />
                    </span>
                  )}
                  {isOverflowSlot && (
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-foreground-strong/60 text-sm font-bold text-white"
                    >
                      +{overflowCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Dialog
        open={dialogMedia != null}
        onClose={() => setDialogMedia(null)}
        title={dialogMedia?.label ?? ""}
      >
        <p className="text-sm text-muted-foreground">
          {dialogMedia?.label} — à venir. Ce contenu n&apos;est pas encore
          disponible pour ce produit.
        </p>
      </Dialog>

      <ProductGalleryLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        activeIndex={lightboxActiveIndex}
        onNavigate={(index) => setActiveIndex(gallerySlides[index].index)}
        productName={productName}
      />
    </div>
  );
}
