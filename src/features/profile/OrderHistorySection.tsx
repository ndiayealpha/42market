import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import type { OrderHistoryEntry } from "@/src/domain/orders";
import { routes } from "@/src/lib/routing/routes";

import { OrderHistoryRow } from "./OrderHistoryRow";

export interface OrderHistorySectionProps {
  entries: OrderHistoryEntry[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
}

function OrderHistorySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton height={64} radius="xl" />
      <Skeleton height={64} radius="xl" />
    </div>
  );
}

export function OrderHistorySection({ entries, totalCount, isLoading, isError }: OrderHistorySectionProps) {
  const isEmpty = !isLoading && !isError && entries.length === 0;

  return (
    <Section
      id="historique"
      title="Historique récent"
      action={
        !isEmpty && (
          <TextLink href={routes.main.orders} variant="default">
            Voir toutes mes commandes ({totalCount})
          </TextLink>
        )
      }
    >
      <div className="mt-4">
        <AsyncSection isLoading={isLoading} isError={isError} skeleton={<OrderHistorySkeleton />}>
          {isEmpty ? (
            <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
              Aucune commande pour l&apos;instant.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {entries.map((entry) => (
                <OrderHistoryRow key={entry.id} entry={entry} />
              ))}
            </ul>
          )}
        </AsyncSection>
      </div>
    </Section>
  );
}
