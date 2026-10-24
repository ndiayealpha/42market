import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { RatingBadge } from "@/src/components/atoms/RatingBadge/RatingBadge";
import type { StorePromoSummary } from "@/src/domain/promotions";
import { formatNumber } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface StorePromoCardProps {
  store: StorePromoSummary;
  /** e.g. a `FavoriteButton` (Favoris page's Épiceries tab) — both top corners and bottom-right are already taken by this card's own badges. Absent by default, every existing usage is unaffected. */
  bottomLeft?: ReactNode;
}

/** Reuses C1's own atoms (`RatingBadge`, `ProductImage`) rather than re-deriving them — a `StoreCard` already exists for the catalog list, but this card's photo badges/tags/footer don't match its contract closely enough to extend without risking that component's existing usages. */
export function StorePromoCard({ store, bottomLeft }: StorePromoCardProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
      <ProductImage
        src={store.image.src}
        alt={store.image.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1024px) 33vw, 100vw"
        topLeft={
          <Chip tone="danger" size="sm" className="font-bold">
            {store.discountLabel}
          </Chip>
        }
        topRight={
          <span className="rounded-full bg-foreground-strong/80 px-2 py-1 text-[11px] font-semibold text-white">
            {formatNumber(store.itemsOnPromoCount)} articles en promo
          </span>
        }
        bottomLeft={bottomLeft}
        bottomRight={
          <span className="flex items-center gap-1 rounded-full bg-surface/90 px-2 py-1 text-[11px] font-bold text-foreground-strong">
            <Icon name="zap" size={12} decorative />
            Retrait {store.pickupMinutes} min
          </span>
        }
      />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-lg font-bold text-foreground-strong">
            <Link href={routes.main.epicerieRayons(store.slug)} className="after:absolute after:inset-0">
              {store.name}
            </Link>
          </p>
          <span className="flex shrink-0 items-center gap-1 text-xs text-ink-muted">
            <RatingBadge value={store.rating.average} size="sm" className="relative z-10" />({formatNumber(store.rating.reviewCount)})
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {store.address} · {store.storeKindLabel}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {store.productTags.map((tag) => (
            <Chip key={tag} tone="cream" size="xs">
              {tag}
            </Chip>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="flex items-center gap-1 text-xs font-medium text-success">
            <Icon name="check-circle" size={14} decorative />
            Minimum 0€
          </p>
          <ButtonLink
            href={routes.main.epicerieRayons(store.slug)}
            variant="primary-md"
            icon={<Icon name="arrow-right" size={14} decorative />}
            className="relative z-10"
          >
            Explorer les rayons
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
