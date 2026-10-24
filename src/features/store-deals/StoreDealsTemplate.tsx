import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import type { DealsBlock } from "@/src/domain/store-deals";
import { getStoreDealsAnchorId } from "@/src/domain/store-deals";

import { ExclusiveOrderBanner } from "./ExclusiveOrderBanner";
import { LoyaltyBanner } from "./LoyaltyBanner";
import { StoreDealsNavigator } from "./StoreDealsNavigator";
import { StoreDealsSection } from "./StoreDealsSection";

export interface StoreDealsTemplateProps {
  blocks: DealsBlock[];
  loyaltyCtaHref: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

function StoreDealsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={88} radius="2xl" />
      <Skeleton height={48} radius="full" />
      <Skeleton height={320} radius="2xl" />
      <Skeleton height={320} radius="2xl" />
    </div>
  );
}

/** Pure template — `StoreDealsView` wires the data; a `DealsBlock` union rendered by an exhaustive switch (rule 6: "union typée rendue par un switch exhaustif"). */
export function StoreDealsTemplate({ blocks, loyaltyCtaHref, isLoading, isError, onRetry }: StoreDealsTemplateProps) {
  const stores = blocks.flatMap((block) => (block.kind === "store" ? [block.store] : []));
  const storesWithPromos = stores.filter((store) => store.products.length > 0);

  return (
    <Container className="flex flex-col gap-8 py-6">
      <ExclusiveOrderBanner />

      <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<StoreDealsSkeleton />}>
        {storesWithPromos.length === 0 ? (
          <EmptyState icon="zap" title="Aucune promotion active pour le moment." description="Revenez bientôt pour de nouveaux bons plans." />
        ) : (
          <>
            <StoreDealsNavigator stores={storesWithPromos} getSectionAnchor={getStoreDealsAnchorId} />

            {blocks.map((block, index) => {
              switch (block.kind) {
                case "store":
                  return block.store.products.length > 0 ? (
                    <StoreDealsSection key={block.store.slug} store={block.store} anchorId={getStoreDealsAnchorId(block.store.slug)} />
                  ) : null;
                case "loyalty-banner":
                  return <LoyaltyBanner key={`loyalty-${index}`} ctaHref={loyaltyCtaHref} />;
                default: {
                  const exhaustive: never = block;
                  throw new Error(`Unhandled deals block: ${JSON.stringify(exhaustive)}`);
                }
              }
            })}
          </>
        )}
      </AsyncSection>
    </Container>
  );
}
