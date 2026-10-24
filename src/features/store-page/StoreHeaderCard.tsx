import { StoreOpenBadge } from "@/src/components/atoms/StoreOpenBadge/StoreOpenBadge";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { FavoriteButton } from "@/src/components/atoms/FavoriteButton/FavoriteButton";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { RatingBadge } from "@/src/components/atoms/RatingBadge/RatingBadge";
import { buildDirectionsUrl, buildTelUrl, getOpeningStatus, type StoreDetail } from "@/src/domain/store-detail";
import { useFavorites } from "@/src/hooks/useFavorites";
import { formatDistanceFromKm, formatNumber } from "@/src/lib/format";

export interface StoreHeaderCardProps {
  store: StoreDetail;
  /** Injected clock — this component never reads the current time itself. */
  now: Date;
}

function getFavoriteLabel(name: string, isFavorite: boolean): string {
  return isFavorite ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`;
}

/**
 * The "15 min" pickup badge is baked into the placeholder photo itself
 * (Background_Border.png) — not re-rendered in HTML, since there's no
 * real pickup-time field for the header to source it from without
 * inventing data. See "assets à remplacer".
 *
 * Favorite state now comes from the shared favorites domain (`useFavorites`),
 * not a per-page local boolean — so "LoirIvoire" stays favorited/not the
 * same way across the fiche boutique, "Tous les rayons" and "Bons plans"
 * pages (rule 7: Header/Profil favorites consistency).
 */
export function StoreHeaderCard({ store, now }: StoreHeaderCardProps) {
  const status = getOpeningStatus(store.openingHours, now);
  const { favoriteIds } = useFavorites("store");
  const isFavorite = favoriteIds.has(store.id);

  return (
    <div className="rounded-2xl bg-catalog-chip p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-surface p-4">
        <ProductImage
          src={store.image.src}
          alt={store.image.alt}
          aspectRatio="260/96"
          fit={store.image.fit}
          priority
          sizes="260px"
          className="w-[180px] shrink-0 rounded-lg sm:w-[260px]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-foreground-strong">{store.name}</h1>
            <StoreOpenBadge isOpen={status.isOpen} label={status.label} />
            {store.isIndependent && (
              <span className="rounded-full bg-catalog-chip px-2 py-0.5 text-[11px] font-semibold text-foreground-strong">
                Commerce indépendant
              </span>
            )}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
            <RatingBadge value={store.rating.average} size="sm" />
            {store.rating.reviewCount > 0 && <span className="underline">({formatNumber(store.rating.reviewCount)} avis)</span>}
            {store.address && (
              <>
                <span aria-hidden>·</span>
                <Icon name="location" size={14} />
                <span>
                  {store.address.street}, {store.address.city}
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <Icon name="location" size={14} className="text-warning" />
            <span>{formatDistanceFromKm(store.distanceKm)}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {store.address && (
            <ButtonLink href={buildDirectionsUrl(store.address)} variant="soft" icon={<Icon name="location" size={16} />}>
              Itinéraire
            </ButtonLink>
          )}
          {store.phone && (
            <ButtonLink href={buildTelUrl(store.phone)} variant="soft" icon={<Icon name="phone" size={16} />}>
              Appeler
            </ButtonLink>
          )}
          <FavoriteButton itemId={store.id} isFavorite={isFavorite} label={getFavoriteLabel(store.name, isFavorite)} tone="solid" kind="store" />
        </div>
      </div>
    </div>
  );
}
