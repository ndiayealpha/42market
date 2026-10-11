import { Button } from "@/src/components/atoms/Button/Button";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Divider } from "@/src/components/atoms/Divider/Divider";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { PriceTag } from "@/src/components/atoms/PriceTag/PriceTag";
import { Thumbnail } from "@/src/components/atoms/Thumbnail/Thumbnail";
import { getDiscountPercent, getMilestoneLabel, getStockLevel, type PreorderCampaign } from "@/src/domain/preorder";

import { StockProgress } from "./StockProgress";

export interface PreorderCardProps {
  campaign: PreorderCampaign;
}

export function PreorderCard({ campaign }: PreorderCardProps) {
  const level = getStockLevel(campaign.reservedPercent, campaign.remaining);
  const isLowOrUrgent = level === "low" || level === "urgent";
  const discount = getDiscountPercent(campaign.price, campaign.originalPrice);
  const isArrival = campaign.milestone.kind === "arrival";

  return (
    <Card variant="outlined" className="flex h-full flex-col">
      <div className="flex min-w-0 gap-3">
        <Thumbnail
          src={campaign.image.src}
          alt={campaign.image.alt}
          size={64}
          overlay={
            <Chip tone={isLowOrUrgent ? "danger" : "success"} size="xs">
              {level === "urgent" ? "Urgent" : `-${discount}%`}
            </Chip>
          }
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] leading-5 font-semibold text-foreground-strong">{campaign.title}</p>
          <PriceTag amount={campaign.price} originalPrice={campaign.originalPrice} className="mt-1" />
          <div className={`mt-1 flex items-center gap-0.5 text-xs font-normal ${isArrival ? "text-catalog-success" : "text-ink-muted"}`}>
            <Icon name="calendar" size={12} />
            {getMilestoneLabel(campaign.milestone)}
          </div>
        </div>
      </div>

      <Divider className="mt-2.5" />

      <div className="mt-2 flex items-end gap-0.5">
        <StockProgress reservedPercent={campaign.reservedPercent} remaining={campaign.remaining} unit={campaign.unit} className="flex-1" />
        <Button variant="primary" aria-label={`Précommander ${campaign.title}`}>
          Précommander
        </Button>
      </div>
    </Card>
  );
}
