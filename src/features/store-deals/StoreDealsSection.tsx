import { TextLink } from "@/src/components/atoms/Link/Link";
import { PickupTimeChip } from "@/src/components/atoms/PickupTimeChip/PickupTimeChip";
import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { Section } from "@/src/components/layout/Section/Section";
import { ProductRail } from "@/src/features/catalog/ProductRail";
import { formatPromoCountLabel, type StoreDealsSummary } from "@/src/domain/store-deals";
import { routes } from "@/src/lib/routing/routes";

export interface StoreDealsSectionProps {
  store: StoreDealsSummary;
  /** This section's own anchor id (rule D2: tiles above link down to it). */
  anchorId: string;
}

/** D3 — one section per boutique with any promo (absent entirely otherwise, rule: "Section ET tuile absentes si la boutique n'a aucune promo" — the caller filters that before rendering). */
export function StoreDealsSection({ store, anchorId }: StoreDealsSectionProps) {
  return (
    <Section
      id={anchorId}
      className="scroll-mt-20"
      leading={<StoreAvatar name={store.name} slug={store.slug} size={36} />}
      title={
        <span className="flex flex-wrap items-center gap-2">
          {store.name}
          <PickupTimeChip label={`Retrait ${store.pickupMinutes} min`} />
        </span>
      }
      subtitle={store.tagline}
      action={
        <TextLink
          href={routes.main.epicerieBonsPlans(store.slug)}
          variant="default"
          aria-label={`Voir toutes les promos de ${store.name} (${formatPromoCountLabel(store.promoCount)})`}
        >
          Voir tout ({formatPromoCountLabel(store.promoCount)}) →
        </TextLink>
      }
    >
      <ProductRail variant="deal" products={store.products} ariaLabel={`Promotions ${store.name}`} />
    </Section>
  );
}
