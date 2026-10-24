import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import type { StorePromoSummary } from "@/src/domain/promotions";
import { formatNumber } from "@/src/lib/format";

import { StorePromoCard } from "./StorePromoCard";

export interface StorePromoListProps {
  stores: StorePromoSummary[];
  openForExpressPickupCount: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

function StorePromoListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton height={320} radius="2xl" />
      <Skeleton height={320} radius="2xl" />
      <Skeleton height={320} radius="2xl" />
    </div>
  );
}

/** Renders every store the data actually returns — the maquette's own "5 boutiques ouvertes" vs. 3 visible cards is a maquette inconsistency (rule 12 #3), not a count to force the card list to match. */
export function StorePromoList({ stores, openForExpressPickupCount, isLoading, isError, onRetry }: StorePromoListProps) {
  return (
    <Section
      id="store-promos"
      title="Toutes les épiceries avec promotions actives"
      subtitle="Commandez vos paniers en ligne et retirez-les sans frais en boutique."
      action={
        <span className="flex items-center gap-1.5 text-sm font-medium text-success">
          <span aria-hidden>●</span>
          {formatNumber(openForExpressPickupCount)} boutiques ouvertes aux retraits express
        </span>
      }
    >
      <div className="mt-4">
        <AsyncSection isLoading={isLoading} isError={isError} isEmpty={stores.length === 0} onRetry={onRetry} skeleton={<StorePromoListSkeleton />}>
          <CardGrid columns={3}>
            {stores.map((store) => (
              <li key={store.slug}>
                <StorePromoCard store={store} />
              </li>
            ))}
          </CardGrid>
        </AsyncSection>
      </div>
    </Section>
  );
}
