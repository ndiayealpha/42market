"use client";

import { useRouter } from "next/navigation";

import {
  filterCampaigns,
  getAverageDiscountPercent,
  getStoreOptions,
  sortCampaigns,
  type GroupPreorderCategory,
  type GroupPreorderSort,
} from "@/src/domain/group-preorder";
import { useGroupPreorderCampaigns } from "@/src/hooks/useGroupPreorderCampaigns";
import { routes } from "@/src/lib/routing/routes";

import { GroupPreordersTemplate } from "./GroupPreordersTemplate";

export interface GroupPreordersViewProps {
  categories: GroupPreorderCategory[];
  activeCategorySlug: string;
  selectedStoreSlug: string | null;
  sort: GroupPreorderSort;
  now: Date;
  refreshedAtIso: string;
}

/** Thin container: wires the campaigns query, filters/sorts via the pure domain functions, and hands the result to the pure `GroupPreordersTemplate` — same shape as `StoreDealsView`/`NewArrivalsView`. */
export function GroupPreordersView({ categories, activeCategorySlug, selectedStoreSlug, sort, now, refreshedAtIso }: GroupPreordersViewProps) {
  const router = useRouter();
  const { campaigns, isLoading, isError, refetch } = useGroupPreorderCampaigns();

  const storeSlugs = selectedStoreSlug ? [selectedStoreSlug] : [];
  const filtered = filterCampaigns(campaigns, activeCategorySlug, storeSlugs);
  const sorted = sortCampaigns(filtered, sort);
  // Store chips reflect the active category only, not the active store, so picking one store doesn't hide the others.
  const storeOptions = getStoreOptions(filterCampaigns(campaigns, activeCategorySlug, []));

  function buildUrl(next: { categorySlug?: string; storeSlug?: string | null; sort?: GroupPreorderSort }): string {
    const search = new URLSearchParams();
    const categorySlug = next.categorySlug ?? activeCategorySlug;
    const storeSlug = next.storeSlug !== undefined ? next.storeSlug : selectedStoreSlug;
    const nextSort = next.sort ?? sort;
    if (categorySlug !== "all") search.set("categorie", categorySlug);
    if (storeSlug) search.set("epicerie", storeSlug);
    if (nextSort !== "closing-soon") search.set("tri", nextSort);
    const query = search.toString();
    return query ? `${routes.main.preorders}?${query}` : routes.main.preorders;
  }

  return (
    <GroupPreordersTemplate
      campaigns={sorted}
      totalCount={campaigns.length}
      openCampaignsCount={campaigns.length}
      averageDiscountPercent={getAverageDiscountPercent(campaigns)}
      categories={categories}
      activeCategorySlug={activeCategorySlug}
      storeOptions={storeOptions}
      selectedStoreSlug={selectedStoreSlug}
      sort={sort}
      onSortChange={(nextSort) => router.push(buildUrl({ sort: nextSort }))}
      buildCategoryHref={(categorySlug) => buildUrl({ categorySlug })}
      buildStoreHref={(storeSlug) => buildUrl({ storeSlug })}
      now={now}
      refreshedAtIso={refreshedAtIso}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
    />
  );
}
