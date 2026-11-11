import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import type { GroupPreorderCampaign, GroupPreorderCategory, GroupPreorderSort, GroupPreorderStoreOption } from "@/src/domain/group-preorder";

import { BecomeOrganizerCta } from "./BecomeOrganizerCta";
import { GroupPreorderCampaignGrid } from "./GroupPreorderCampaignGrid";
import { GroupPreorderCategoryFilters } from "./GroupPreorderCategoryFilters";
import { GroupPreorderStoreFilters } from "./GroupPreorderStoreFilters";
import { GroupPreordersHero } from "./GroupPreordersHero";
import { HowItWorksSection } from "./HowItWorksSection";
import { WhyGroupedBanner } from "./WhyGroupedBanner";

export interface GroupPreordersTemplateProps {
  campaigns: GroupPreorderCampaign[];
  totalCount: number;
  openCampaignsCount: number;
  averageDiscountPercent: number;
  categories: GroupPreorderCategory[];
  activeCategorySlug: string;
  storeOptions: GroupPreorderStoreOption[];
  selectedStoreSlug: string | null;
  sort: GroupPreorderSort;
  onSortChange: (sort: GroupPreorderSort) => void;
  buildCategoryHref: (categorySlug: string) => string;
  buildStoreHref: (storeSlug: string | null) => string;
  now: Date;
  refreshedAtIso: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

function GroupPreordersSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={260} radius="2xl" />
      <Skeleton height={48} radius="full" />
      <Skeleton height={320} radius="2xl" />
    </div>
  );
}

export function GroupPreordersTemplate({
  campaigns,
  totalCount,
  openCampaignsCount,
  averageDiscountPercent,
  categories,
  activeCategorySlug,
  storeOptions,
  selectedStoreSlug,
  sort,
  onSortChange,
  buildCategoryHref,
  buildStoreHref,
  now,
  refreshedAtIso,
  isLoading,
  isError,
  onRetry,
}: GroupPreordersTemplateProps) {
  return (
    <Container className="flex flex-col gap-8 py-6">
      <GroupPreordersHero openCampaignsCount={openCampaignsCount} averageDiscountPercent={averageDiscountPercent} />

      <GroupPreorderCategoryFilters
        categories={categories}
        activeCategorySlug={activeCategorySlug}
        totalCount={totalCount}
        buildHref={buildCategoryHref}
        sort={sort}
        onSortChange={onSortChange}
      />

      {storeOptions.length > 0 && (
        <GroupPreorderStoreFilters options={storeOptions} selectedStoreSlug={selectedStoreSlug} buildHref={buildStoreHref} />
      )}

      <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<GroupPreordersSkeleton />}>
        {campaigns.length === 0 ? (
          <EmptyState icon="archive" title="Aucune campagne ne correspond à ces critères." description="Essayez une autre catégorie ou épicerie." />
        ) : (
          <GroupPreorderCampaignGrid campaigns={campaigns} now={now} refreshedAtIso={refreshedAtIso} />
        )}
      </AsyncSection>

      <HowItWorksSection />
      <WhyGroupedBanner />
      <BecomeOrganizerCta />
    </Container>
  );
}
