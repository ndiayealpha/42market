"use client";

import { assembleNewArrivalBlocks, filterNewArrivalSectionsByCategory, type NewArrivalCategory } from "@/src/domain/new-arrival";
import { useNewArrivalSections } from "@/src/hooks/useNewArrivalSections";

import { NewArrivalsTemplate } from "./NewArrivalsTemplate";

export interface NewArrivalsViewProps {
  categories: NewArrivalCategory[];
  activeCategorySlug: string;
}

/** Thin container: wires the sections query, filters by category and assembles the typed block list, then hands it to the pure `NewArrivalsTemplate` — same shape as `StoreDealsView`. */
export function NewArrivalsView({ categories, activeCategorySlug }: NewArrivalsViewProps) {
  const { sections, isLoading, isError, refetch } = useNewArrivalSections();

  const filteredSections = filterNewArrivalSectionsByCategory(sections, activeCategorySlug);
  const blocks = assembleNewArrivalBlocks(filteredSections);
  const totalCount = sections.flatMap((section) => section.products).length;

  return (
    <NewArrivalsTemplate
      blocks={blocks}
      categories={categories}
      activeCategorySlug={activeCategorySlug}
      totalCount={totalCount}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
    />
  );
}
