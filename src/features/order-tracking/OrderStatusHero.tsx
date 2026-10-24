"use client";

import Link from "next/link";

import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ReminderToggleButton } from "@/src/components/molecules/ReminderToggleButton/ReminderToggleButton";
import { ORDER_STATUS_HERO_CONFIG, type FullOrder } from "@/src/domain/orders";
import { formatTime } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

import { useOrderReminder } from "./useOrderReminder";

export interface OrderStatusHeroProps {
  order: FullOrder;
  phoneVerified: boolean;
}

/**
 * S1 — the beige hero card: status icon/title/description, reference/time/
 * payment pastilles, and the reminder toggle. Only "preparing" is
 * maquetted; the other 3 statuses derive from `ORDER_STATUS_HERO_CONFIG`'s
 * shared vocabulary (flagged in the compte-rendu).
 */
export function OrderStatusHero({ order, phoneVerified }: OrderStatusHeroProps) {
  const heroConfig = ORDER_STATUS_HERO_CONFIG[order.status];
  const reminder = useOrderReminder(order.id);
  const description = heroConfig.description(order.store.name);
  const [before, after] = description.split(order.store.name);
  const showPaymentPastille = order.payment.method === "online" && order.payment.isPaid;

  return (
    <Card variant="elevated" className="bg-surface-subtle">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-foreground-strong text-white">
            <Icon name={heroConfig.icon} size={28} decorative />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-foreground-strong sm:text-2xl">{heroConfig.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {before}
              <strong className="text-foreground-strong">{order.store.name}</strong>
              {after}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-foreground-strong">{order.reference}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-foreground-strong">
                <Icon name="clock" size={14} decorative />
                <time dateTime={order.createdAtIso}>{formatTime(order.createdAtIso)}</time>
              </span>
              {showPaymentPastille && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-3 py-1 text-xs font-semibold text-success">
                  <Icon name="shield" size={14} decorative />
                  Transaction CB 3D Secure approuvée
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
          <ReminderToggleButton
            enabled={order.reminderEnabled}
            disabled={!phoneVerified || reminder.isPending}
            onToggle={() => reminder.toggle(!order.reminderEnabled)}
          />
          {!phoneVerified && (
            <Link href={routes.main.settings} className="text-xs font-semibold text-foreground-strong underline underline-offset-2">
              Vérifiez votre téléphone dans Informations personnelles
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
