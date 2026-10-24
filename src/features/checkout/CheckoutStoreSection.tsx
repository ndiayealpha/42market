import Link from "next/link";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { Section } from "@/src/components/layout/Section/Section";
import { buildDirectionsUrl, getOpeningStatus, type StoreDetailWithContact } from "@/src/domain/store-detail";
import { formatDistanceCompact } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface CheckoutStoreSectionProps {
  /** Checkout only ever renders the one store with a full fixture (phone/address guaranteed) — see `StoreDetailWithContact`'s own doc comment. */
  store: StoreDetailWithContact;
  now: Date;
}

/**
 * K3 (`id="point-de-retrait"`) — no `PickupStoreCard` exists anywhere in
 * the repo yet (checked `src/features/profile`), so this is a new,
 * page-scoped section rather than an extension of something that doesn't
 * fit. "Changer d'épicerie" is a plain link, not a confirmation dialog:
 * switching stores from checkout fundamentally means starting over, so
 * navigating away (same destination `StoreContextBar` already uses) is
 * simplification enough — no cart-reset logic duplicated here.
 */
export function CheckoutStoreSection({ store, now }: CheckoutStoreSectionProps) {
  const openingStatus = getOpeningStatus(store.openingHours, now);

  return (
    <Section
      id="point-de-retrait"
      headingTabIndex={-1}
      title="Épicerie de retrait sélectionnée"
      action={
        <Link href={routes.main.epiceries} className="text-sm font-semibold text-foreground-strong underline underline-offset-2">
          Changer d&apos;épicerie ⇄
        </Link>
      }
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-catalog-chip p-4 sm:flex-row">
        <ProductImage
          src={store.image.src}
          alt={store.image.alt}
          aspectRatio="144/116"
          sizes="144px"
          className="h-[116px] w-full shrink-0 rounded-xl sm:w-[144px]"
          topLeft={
            <Chip tone="cream" size="sm" icon={<span aria-hidden>🚶</span>}>
              {formatDistanceCompact(store.distanceKm)}
            </Chip>
          }
        />
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-extrabold text-foreground-strong">{store.name}</p>
            {/* Stand-in for the maquette's "olive" tone — `success` reuses the app's existing deep-green token (`--catalog-success`) rather than adding a new Chip tone for one usage. */}
            <Chip tone="success" size="sm" icon={<span aria-hidden>⚡</span>}>
              Prêt sous 2h • Gratuit
            </Chip>
          </div>
          <p className="text-sm text-muted-foreground">
            {store.address.street}, {store.address.city}
          </p>
          <Chip tone={openingStatus.isOpen ? "success" : "danger"} size="sm" shape="pill">
            {openingStatus.label}
          </Chip>
          <p className="text-xs text-muted-foreground">Consigne réfrigérée active</p>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground-strong">
            <Icon name="shield" size={14} decorative />
            Partenaire agréé 42 Markets Saint-Étienne
          </p>
          <a
            href={buildDirectionsUrl(store.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-xs font-semibold text-foreground-strong underline underline-offset-2"
          >
            Voir sur la carte
          </a>
        </div>
      </div>
    </Section>
  );
}
