import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import type { NewArrivalCategory, NewArrivalsBlock } from "@/src/domain/new-arrival";
import { ExclusiveOrderBanner } from "@/src/features/store-deals/ExclusiveOrderBanner";

import { FleetAlertBanner } from "./FleetAlertBanner";
import { NewArrivalCategoryFilters } from "./NewArrivalCategoryFilters";
import { NewArrivalsHero } from "./NewArrivalsHero";
import { NewArrivalsSection } from "./NewArrivalsSection";
import { NewArrivalsStoreSelector } from "./NewArrivalsStoreSelector";
import { PickupStoresSection } from "./PickupStoresSection";

export interface NewArrivalsTemplateProps {
  blocks: NewArrivalsBlock[];
  categories: NewArrivalCategory[];
  activeCategorySlug: string;
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

function NewArrivalsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={88} radius="2xl" />
      <Skeleton height={48} radius="full" />
      <Skeleton height={320} radius="2xl" />
      <Skeleton height={320} radius="2xl" />
    </div>
  );
}

/** Pure template — `NewArrivalsView` wires the data; a `NewArrivalsBlock` union rendered by an exhaustive switch, same rule as `StoreDealsTemplate`. */
export function NewArrivalsTemplate({
  blocks,
  categories,
  activeCategorySlug,
  totalCount,
  isLoading,
  isError,
  onRetry,
}: NewArrivalsTemplateProps) {
  const sections = blocks.flatMap((block) => (block.kind === "section" ? [block.section] : []));

  return (
    <Container className="flex flex-col gap-8 py-6">
      <NewArrivalsHero />
      <ExclusiveOrderBanner />
      <NewArrivalCategoryFilters categories={categories} activeCategorySlug={activeCategorySlug} totalCount={totalCount} />

      <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<NewArrivalsSkeleton />}>
        {sections.length === 0 ? (
          <EmptyState
            icon="truck"
            title="Aucun nouvel arrivage pour cette catégorie."
            description="Essayez une autre catégorie ou revenez plus tard."
          />
        ) : (
          <>
            <NewArrivalsStoreSelector sections={sections} />

            {blocks.map((block, index) => {
              switch (block.kind) {
                case "section":
                  return block.section.products.length > 0 ? (
                    <NewArrivalsSection key={block.section.stores.map((store) => store.slug).join("-")} section={block.section} />
                  ) : null;
                case "fleet-alert-banner":
                  return <FleetAlertBanner key={`fleet-alert-${index}`} />;
                default: {
                  const exhaustive: never = block;
                  throw new Error(`Unhandled new-arrivals block: ${JSON.stringify(exhaustive)}`);
                }
              }
            })}

            <PickupStoresSection sections={sections} />
          </>
        )}
      </AsyncSection>
    </Container>
  );
}
