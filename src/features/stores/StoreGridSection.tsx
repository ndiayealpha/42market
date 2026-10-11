import type { ReactNode } from "react";

import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import type { Store } from "@/src/domain/store";

import { StoreCard } from "./StoreCard";
import { StoreCardSkeleton } from "./StoreCardSkeleton";

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3"];

export interface StoreGridSectionProps {
  id: string;
  title: string;
  eyebrow?: ReactNode;
  action?: ReactNode;
  stores: Store[];
  isLoading?: boolean;
  emptyMessage: string;
}

/** The one grid section behind both "Épiceries près de vous" and "Épiceries de la ville" — only the props passed in differ. */
export function StoreGridSection({ id, title, eyebrow, action, stores, isLoading, emptyMessage }: StoreGridSectionProps) {
  if (isLoading) {
    return (
      <Section id={id} title={title} eyebrow={eyebrow} action={action}>
        <CardGrid columns={3}>
          {SKELETON_KEYS.map((key) => (
            <li key={key}>
              <StoreCardSkeleton />
            </li>
          ))}
        </CardGrid>
      </Section>
    );
  }

  return (
    <Section id={id} title={title} eyebrow={eyebrow} action={action}>
      {stores.length === 0 ? (
        <p className="text-sm text-ink-muted">{emptyMessage}</p>
      ) : (
        <CardGrid columns={3}>
          {stores.map((store) => (
            <li key={store.id}>
              <StoreCard store={store} />
            </li>
          ))}
        </CardGrid>
      )}
    </Section>
  );
}
