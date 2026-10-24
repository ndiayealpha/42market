import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import type { LimitedStockItem } from "@/src/domain/store-merchandising";

import { StockProductCard } from "./StockProductCard";

export interface LimitedStockSectionProps {
  items: LimitedStockItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAdd: (itemId: string) => void;
}

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];

export function LimitedStockSection({ items, isLoading, isError, onRetry, onAdd }: LimitedStockSectionProps) {
  return (
    <Section
      id="limited-stock"
      title={
        <span className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-catalog-danger" aria-hidden />
            Arrivages en stock limité
          </span>
          <span className="rounded-full bg-store-accent-gold px-2 py-1 text-xs font-bold text-foreground-strong">
            Urgence fraîcheur
          </span>
        </span>
      }
      action={
        // TODO: no "all arrivals" route exists yet
        <ButtonLink href="#" variant="soft" icon={<Icon name="arrow-right" size={16} />}>
          Voir tous les arrivages
        </ButtonLink>
      }
    >
      <AsyncSection
        isLoading={isLoading}
        isError={isError}
        isEmpty={items.length === 0}
        onRetry={onRetry}
        skeleton={
          <CardGrid columns={4}>
            {SKELETON_KEYS.map((key) => (
              <li key={key}>
                <Skeleton width="100%" height={260} radius="xl" />
              </li>
            ))}
          </CardGrid>
        }
      >
        <CardGrid columns={4}>
          {items.map((item) => (
            <li key={item.id}>
              <StockProductCard item={item} onAdd={() => onAdd(item.id)} />
            </li>
          ))}
        </CardGrid>
      </AsyncSection>
    </Section>
  );
}
