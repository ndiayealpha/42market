import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import type { BestSeller } from "@/src/domain/store-merchandising";

import { BestSellerCard } from "./BestSellerCard";

export interface BestSellersSectionProps {
  bestSellers: BestSeller[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAdd: (bestSellerId: string) => void;
}

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];

export function BestSellersSection({ bestSellers, isLoading, isError, onRetry, onAdd }: BestSellersSectionProps) {
  return (
    <Section
      id="best-sellers"
      title="Meilleures ventes de l'épicerie"
      subtitle="Les coups de cœur récurrents des Stéphanois"
      action={
        // TODO: no "full ranking" route exists yet
        <ButtonLink href="#" variant="soft" icon={<Icon name="arrow-right" size={16} />}>
          Voir le classement complet
        </ButtonLink>
      }
    >
      <AsyncSection
        isLoading={isLoading}
        isError={isError}
        isEmpty={bestSellers.length === 0}
        onRetry={onRetry}
        skeleton={
          <CardGrid columns={4}>
            {SKELETON_KEYS.map((key) => (
              <li key={key}>
                <Skeleton width="100%" height={88} radius="xl" />
              </li>
            ))}
          </CardGrid>
        }
      >
        <CardGrid columns={4}>
          {bestSellers.map((bestSeller) => (
            <li key={bestSeller.id}>
              <BestSellerCard bestSeller={bestSeller} onAdd={() => onAdd(bestSeller.id)} />
            </li>
          ))}
        </CardGrid>
      </AsyncSection>
    </Section>
  );
}
