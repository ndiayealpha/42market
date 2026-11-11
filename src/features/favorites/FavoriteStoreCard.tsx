import Link from "next/link";

import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { PickupTimeChip } from "@/src/components/atoms/PickupTimeChip/PickupTimeChip";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { RatingBadge } from "@/src/components/atoms/RatingBadge/RatingBadge";
import {
  buildStorePromoDirectionsUrl,
  getDeliveryBadgeLabel,
  getStorePromoOpeningStatus,
  type StorePromoSummary,
} from "@/src/domain/promotions";
import { useFavorites } from "@/src/hooks/useFavorites";
import { formatDistance, formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface FavoriteStoreCardProps {
  store: StorePromoSummary;
  now: Date;
}

/** Vertical list row (maquette layout) — a sibling to `StorePromoCard`, not built on top of it: the two share almost no markup once the photo/content split and the top-products row are accounted for. */
export function FavoriteStoreCard({ store, now }: FavoriteStoreCardProps) {
  const { favoriteIds } = useFavorites("store");
  const isFavorite = favoriteIds.has(store.slug);
  const openingStatus = getStorePromoOpeningStatus(store, now);
  const deliveryLabel = getDeliveryBadgeLabel(store);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface p-4 shadow-card sm:flex-row">
      <div className="relative w-full shrink-0 sm:w-56">
        <ProductImage
          src={store.image.src}
          alt={store.image.alt}
          aspectRatio="4/3"
          sizes="(min-width: 640px) 224px, 100vw"
          topRight={
            <FavoriteButton
              itemId={store.slug}
              isFavorite={isFavorite}
              label={isFavorite ? `Retirer ${store.name} des favoris` : `Ajouter ${store.name} aux favoris`}
              kind="store"
              tone="surface"
              className="relative z-10"
            />
          }
          bottomLeft={
            <span
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${
                openingStatus.isOpen ? "bg-success text-white" : "bg-foreground-strong/80 text-white"
              }`}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
              {openingStatus.isOpen ? "Ouvert" : "Fermé"}
            </span>
          }
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-lg font-bold text-foreground-strong">
              <Link href={routes.main.epicerieDetail(store.slug)} className="after:absolute after:inset-0">
                {store.name}
              </Link>
              <RatingBadge value={store.rating.average} size="sm" className="relative z-10" />
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {store.address} · {formatDistance(store.distanceMeters)}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <PickupTimeChip label={`Retrait ${store.pickupMinutes} min`} tone="neutral" />
            {deliveryLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground-strong px-2.5 py-1 text-xs font-semibold text-white">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
                {deliveryLabel}
              </span>
            )}
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-ink-muted">{store.description}</p>

        {store.topProducts.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Top produits disponibles chez ce commerçant :</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {store.topProducts.map((product) => (
                <Link
                  key={product.id}
                  href={routes.main.epicerieProduit(store.slug, product.slug)}
                  className="relative z-10 flex items-center gap-2 rounded-xl bg-catalog-chip p-2"
                >
                  <ProductImage src={product.image.src} alt={product.image.alt} aspectRatio="1/1" sizes="40px" className="w-10 shrink-0 rounded-lg" />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-foreground-strong">{product.name}</span>
                    <span className="block text-xs text-muted-foreground">{formatPrice(product.price)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground-strong">
            <Icon name="check-circle" size={14} className="text-success" decorative />
            {store.trustLabel}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={buildStorePromoDirectionsUrl(store.address)}
              target="_blank"
              rel="noopener"
              className="relative z-10 flex items-center gap-1 text-xs font-bold text-foreground-strong underline underline-offset-2"
            >
              <Icon name="location" size={14} decorative />
              Voir l&apos;itinéraire
            </a>
            <Link
              href={routes.main.epicerieDetail(store.slug)}
              className="relative z-10 flex items-center gap-1 text-xs font-bold text-foreground-strong"
            >
              Visiter la boutique
              <Icon name="arrow-right" size={14} decorative />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
