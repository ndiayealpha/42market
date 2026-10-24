"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import type { ActiveOrder, OrderStatusConfig } from "@/src/domain/orders";
import { getOrderStatusConfig } from "@/src/domain/orders";
import { formatDistance, formatPrice } from "@/src/lib/format";
import { buildTelUrl } from "@/src/domain/store-detail";
import { routes } from "@/src/lib/routing/routes";

import { QrCodeDialog } from "./QrCodeDialog";

export interface ActiveOrderSectionProps {
  order: ActiveOrder | null;
  isLoading: boolean;
  isError: boolean;
}

const STATUS_TONE_CLASSES: Record<OrderStatusConfig["tone"], string> = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
};

function ActiveOrderSkeleton() {
  return <Skeleton height={260} radius="2xl" />;
}

/** Section is entirely absent when there's no active order (rule 10: "section masquée"), not an empty-state message. */
export function ActiveOrderSection({ order, isLoading, isError }: ActiveOrderSectionProps) {
  const [qrOpen, setQrOpen] = useState(false);

  if (isLoading) {
    return (
      <Section id="commande-en-cours" title="Commande en cours">
        <div className="mt-4">
          <ActiveOrderSkeleton />
        </div>
      </Section>
    );
  }

  if (isError || !order) return null;

  const statusConfig = getOrderStatusConfig(order.status);

  return (
    <Section
      id="commande-en-cours"
      title={
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-full bg-success" />
          Commande en cours
          <Chip tone="cream" size="sm">
            {order.pickupModeLabel}
          </Chip>
        </span>
      }
      action={<span className="text-xs font-semibold text-muted-foreground">{order.reference}</span>}
    >
      <Card variant="elevated" className="mt-4 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="clock" size={16} decorative />
            <span>
              CRÉNEAU ESTIMÉ · <strong className="text-foreground-strong">Retrait prévu : {order.etaLabel}</strong>
            </span>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${STATUS_TONE_CLASSES[statusConfig.tone]}`}>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
            {statusConfig.label}
          </span>
        </div>

        <div className="rounded-xl border border-catalog-line p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-foreground-strong">
                <Icon name="store" size={16} decorative />
                {order.store.name}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="location" size={14} decorative />
                {order.store.street}, {order.store.city}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {order.store.counterInfo} • Contact commerçant :{" "}
                <a href={buildTelUrl(order.store.phone)} className="font-medium text-foreground hover:underline">
                  {order.store.phone}
                </a>
              </p>
            </div>
            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              {formatDistance(order.store.distanceMeters)} de chez vous
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-muted-foreground">{order.itemsSummary}</p>
          <p className="font-bold text-foreground-strong">Total : {formatPrice(order.totalAmount)} TTC</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* Primary action now that Page S (live tracking) exists — the QR dialog stays available as a quicker secondary trigger (rule 7: "ouvre le dialogue PickupQrPanel (ou S)"). */}
          <ButtonLink
            variant="primary-md"
            href={routes.main.orderDetail(order.id)}
            className="!h-auto w-full !whitespace-normal py-2.5 text-center leading-snug"
            icon={<Icon name="arrow-right" size={16} decorative />}
          >
            Suivre ma commande en direct
          </ButtonLink>
          <Button
            variant="soft"
            className="!h-auto w-full whitespace-normal py-2.5 text-center leading-snug sm:w-auto"
            icon={<Icon name="qr-code" size={16} decorative />}
            onClick={() => setQrOpen(true)}
          >
            Afficher le QR Code
          </Button>
        </div>
      </Card>

      <QrCodeDialog order={order} open={qrOpen} onClose={() => setQrOpen(false)} />
    </Section>
  );
}
