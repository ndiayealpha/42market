import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { TextLink } from "@/src/components/atoms/Link/Link";
import type { Terroir } from "@/src/domain/terroir";

import { AddTerroirCard } from "./AddTerroirCard";
import { TerroirCard } from "./TerroirCard";

export interface TerroirsSectionProps {
  terroirs: Terroir[];
  suggestionLabel: string;
  isLoading: boolean;
  isError: boolean;
  editHref: string;
}

function TerroirsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} height={220} radius="2xl" />
      ))}
    </div>
  );
}

export function TerroirsSection({ terroirs, suggestionLabel, isLoading, isError, editHref }: TerroirsSectionProps) {
  return (
    <Section
      id="terroirs"
      title="Mes terroirs de cœur"
      subtitle="Vos produits prioritaires et suggestions hebdomadaires s'adaptent à vos racines et découvertes culinaires."
      action={
        <TextLink href={editHref} variant="default">
          Modifier
        </TextLink>
      }
    >
      <div className="mt-4">
        <AsyncSection isLoading={isLoading} isError={isError} skeleton={<TerroirsSkeleton />}>
          <CardGrid columns={3}>
            {terroirs.map((terroir) => (
              <TerroirCard key={terroir.id} terroir={terroir} />
            ))}
            <AddTerroirCard suggestionLabel={suggestionLabel} />
          </CardGrid>
        </AsyncSection>
      </div>
    </Section>
  );
}
