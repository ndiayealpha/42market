"use client";

import { Button } from "@/src/components/atoms/Button/Button";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { ProgressBar } from "@/src/components/atoms/ProgressBar/ProgressBar";
import {
  formatClosingLabel,
  getCampaignUnitPrice,
  getFillPercent,
  getProgressState,
  getRibbonLabel,
  type GroupPreorderCampaign,
} from "@/src/domain/group-preorder";
import { useReserveGroupPreorder } from "@/src/hooks/useReserveGroupPreorder";
import { formatPrice, formatShortDay } from "@/src/lib/format";
import { useToast } from "@/src/providers/toast-provider";

export interface GroupPreorderCampaignCardProps {
  campaign: GroupPreorderCampaign;
  now: Date;
}

export function GroupPreorderCampaignCard({ campaign, now }: GroupPreorderCampaignCardProps) {
  const reserve = useReserveGroupPreorder();
  const toast = useToast();

  const fillPercent = getFillPercent(campaign);
  const progress = getProgressState(campaign, now);
  const unitPrice = getCampaignUnitPrice(campaign);

  function handleReserve() {
    reserve.mutate(campaign.id, {
      onSuccess: () => toast.show(`Précommande enregistrée pour « ${campaign.title} ».`, "success"),
    });
  }

  return (
    <Card variant="elevated" className="flex h-full flex-col gap-3 overflow-hidden !p-0">
      <ProductImage
        src={campaign.image.src}
        alt={campaign.image.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1280px) 23vw, (min-width: 640px) 46vw, 92vw"
        topLeft={
          <Chip tone="danger" size="sm" className="font-bold">
            {getRibbonLabel(campaign)}
          </Chip>
        }
        topRight={
          <Chip tone="cream" size="xs">
            {campaign.originBadge}
          </Chip>
        }
        bottomRight={
          <span className="rounded-full bg-surface/95 px-2.5 py-1 text-xs font-bold text-foreground-strong shadow-card">
            Clôture : {formatClosingLabel(campaign, now)}
          </span>
        }
      />

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold text-ink-muted">
            <Icon name="store" size={12} decorative />
            {campaign.storeName} · {campaign.neighborhood}
          </p>
          <p className="mt-1 text-lg font-extrabold text-foreground-strong">{campaign.title}</p>
          <p className="mt-1 line-clamp-3 text-xs text-ink-muted">{campaign.description}</p>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className={`text-[11px] font-semibold ${progress.isAlert ? "text-catalog-danger" : "text-ink-muted"}`}>
              {fillPercent}% réservé ({campaign.reservedQuantity}/{campaign.capacityQuantity})
            </span>
            <span className={`text-[11px] font-bold ${progress.isAlert ? "text-catalog-danger" : "text-foreground-strong"}`}>{progress.label}</span>
          </div>
          <ProgressBar
            value={fillPercent}
            tone={progress.isAlert ? "danger" : "success"}
            aria-valuetext={`${fillPercent} % réservé, ${progress.label}`}
            className="mt-1"
          />
        </div>

        <p className="flex items-center gap-1.5 rounded-lg bg-surface-subtle px-2.5 py-1.5 text-xs font-semibold text-foreground-strong">
          <Icon name="calendar" size={14} decorative />
          Arrivage : {formatShortDay(campaign.arrivalDateIso)}
          <span aria-hidden className="text-ink-muted">
            ·
          </span>
          {campaign.pickupMode}
        </p>

        <div className="mt-auto flex flex-col gap-2">
          <p className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-foreground-strong">{formatPrice(campaign.price)}</span>
            <del className="text-xs text-catalog-faint">{formatPrice(campaign.originalPrice)}</del>
            <span className="ml-auto text-xs font-semibold text-ink-muted">
              {formatPrice(unitPrice)}/{campaign.packagingUnit}
            </span>
          </p>
          <Button
            variant="primary-lg"
            onClick={handleReserve}
            disabled={reserve.isPending}
            aria-label={`Précommander ${campaign.title} pour ${formatPrice(campaign.price)}`}
          >
            🛍 Précommander ({formatPrice(campaign.price)})
          </Button>
        </div>
      </div>
    </Card>
  );
}
