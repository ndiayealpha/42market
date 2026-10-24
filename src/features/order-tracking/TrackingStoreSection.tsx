import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { StoreOpenBadge } from "@/src/components/atoms/StoreOpenBadge/StoreOpenBadge";
import { StoreMap } from "@/src/components/molecules/StoreMap/StoreMap";
import type { FullOrderStore } from "@/src/domain/orders";
import { buildDirectionsUrl, buildTelUrl } from "@/src/domain/store-detail";

export interface TrackingStoreSectionProps {
  store: FullOrderStore;
}

/**
 * S5 — the pickup store's card: identity + opening badge, contact/
 * directions, and the static map fallback. `isOpenNow`/`openUntilLabel`
 * are precomputed on the fixture rather than derived from raw opening
 * hours (this order record doesn't carry a full weekly schedule) — same
 * spirit as `getOpeningStatus` elsewhere, simplified for this one screen.
 */
export function TrackingStoreSection({ store }: TrackingStoreSectionProps) {
  const directionsUrl = buildDirectionsUrl({ street: store.street, city: store.city });

  return (
    <Card variant="elevated" className="space-y-4">
      <div className="flex items-center gap-3">
        <StoreAvatar name={store.name} slug={store.slug} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-foreground-strong">{store.name}</p>
          <p className="text-xs text-muted-foreground">{store.openUntilLabel}</p>
        </div>
        <StoreOpenBadge isOpen={store.isOpenNow} label={store.isOpenNow ? "Ouvert" : "Fermé"} />
      </div>

      <div className="space-y-3 rounded-xl bg-catalog-chip p-4">
        <p className="flex items-start gap-2 text-sm text-foreground-strong">
          <Icon name="location" size={16} className="mt-0.5 shrink-0" decorative />
          <span>
            {store.street}
            <br />
            {store.city} • {store.consigneNote}
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={buildTelUrl(store.phone)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground-strong hover:bg-background"
          >
            <Icon name="phone" size={16} decorative />
            {store.phone}
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground-strong px-3 py-1.5 text-sm font-semibold text-white hover:bg-catalog-cta-hover"
          >
            <Icon name="gps" size={16} decorative />
            Itinéraire
          </a>
        </div>
      </div>

      <StoreMap directionsUrl={directionsUrl} caption={store.mapCaption} />
    </Card>
  );
}
