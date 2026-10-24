import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { TextLink } from "@/src/components/atoms/Link/Link";
import type { FlashSale } from "@/src/domain/promotions";
import type { PromoProduct } from "@/src/domain/promotions";
import { formatNumber } from "@/src/lib/format";

import { FlashSaleEyebrow } from "./FlashSaleEyebrow";
import { ProductRail } from "./ProductRail";

export interface FeaturedSelectionSectionProps {
  flashSale: FlashSale | null;
  now: Date;
  products: PromoProduct[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  /** False once the périmètre selector is down to one store — its name on every card would be redundant (rule 9: "UneSeuleBoutique"). */
  showStoreName?: boolean;
}

function FeaturedSkeleton() {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} width={190} height={320} radius="xl" />
      ))}
    </div>
  );
}

/** B3 — the flash-sale eyebrow only renders when a flash sale is actually active (rule 10: "pas de vente flash → pastille masquée"). */
export function FeaturedSelectionSection({
  flashSale,
  now,
  products,
  totalCount,
  isLoading,
  isError,
  onRetry,
  showStoreName = true,
}: FeaturedSelectionSectionProps) {
  // TODO: no "full selection" listing route exists yet — the action link below is a same-page anchor.
  return (
    <Section
      id="selection-vedette"
      eyebrow={flashSale && <FlashSaleEyebrow flashSale={flashSale} now={now} />}
      title="Sélection en vedette"
      action={<TextLink href="#selection-vedette">Voir toute la sélection ({formatNumber(totalCount)})</TextLink>}
    >
      <div className="mt-4">
        <AsyncSection isLoading={isLoading} isError={isError} isEmpty={products.length === 0} onRetry={onRetry} skeleton={<FeaturedSkeleton />}>
          {/* Distinct name from the section's own "Sélection en vedette" landmark — two nested regions can't share one accessible name (axe: landmark-unique). */}
          <ProductRail products={products} showArrows showStoreName={showStoreName} ariaLabel="Produits de la sélection en vedette" />
        </AsyncSection>
      </div>
    </Section>
  );
}
