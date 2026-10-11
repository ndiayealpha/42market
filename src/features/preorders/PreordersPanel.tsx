import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import type { PreorderCampaign } from "@/src/domain/preorder";

import { PreorderCard } from "./PreorderCard";
import { PreorderCardSkeleton } from "./PreorderCardSkeleton";

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];

export interface PreordersPanelProps {
  campaigns: PreorderCampaign[];
  isLoading?: boolean;
}

/** The "DIRECT PRODUCTEURS" promo-tinted panel wrapping the 4-column campaign grid. */
export function PreordersPanel({ campaigns, isLoading }: PreordersPanelProps) {
  return (
    <div className="rounded-2xl bg-catalog-promo p-5 shadow-card">
      <div className="flex items-center gap-3 border-b border-catalog-line-promo">
        <Chip tone="cream" shape="pill" size="sm" uppercase icon={<Icon name="archive" size={14} />} className="!px-2.5 !font-extrabold !tracking-[0.02em]">
          DIRECT PRODUCTEURS
        </Chip>
        <p className="text-[13px] leading-[18px] text-ink-muted">Tarifs grossistes en direct · Retrait en épicerie locale</p>
      </div>

      <div className="mt-4">
        <CardGrid columns={4}>
          {isLoading
            ? SKELETON_KEYS.map((key) => (
                <li key={key}>
                  <PreorderCardSkeleton />
                </li>
              ))
            : campaigns.map((campaign) => (
                <li key={campaign.id}>
                  <PreorderCard campaign={campaign} />
                </li>
              ))}
        </CardGrid>
      </div>
    </div>
  );
}
