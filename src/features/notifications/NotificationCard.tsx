"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import {
  NOTIFICATION_TYPE_CONFIG,
  getNotificationAction,
  getNotificationBadge,
  getNotificationContextLabel,
  type Notification,
} from "@/src/domain/notifications";
import { QrCodeDialog } from "@/src/features/profile/QrCodeDialog";
import { useAddToCart } from "@/src/hooks/useAddToCart";
import { useMarkNotificationRead } from "@/src/hooks/useMarkNotificationRead";
import { useCartActions, useCartItemCount } from "@/src/lib/cart/cart.store";
import { formatRelativeTime } from "@/src/lib/format";
import { useToast } from "@/src/providers/toast-provider";

export interface NotificationCardProps {
  notification: Notification;
  now: Date;
}

const ACCENT_CLASSES = { default: "border-l-foreground-strong", danger: "border-l-danger" };
const ICON_TILE_TONE = { neutral: "neutral", cream: "cream", success: "success" } as const;

/** N4 — the one card for all 8 notification types, config-driven (rule O: no per-type `if` here). */
export function NotificationCard({ notification, now }: NotificationCardProps) {
  const [qrOpen, setQrOpen] = useState(false);
  const [confirmSwitchStore, setConfirmSwitchStore] = useState(false);
  const config = NOTIFICATION_TYPE_CONFIG[notification.type];
  const badge = getNotificationBadge(notification, now);
  const action = getNotificationAction(notification);
  const contextLabel = getNotificationContextLabel(notification);
  const markAsRead = useMarkNotificationRead();
  const { addToCart } = useAddToCart();
  const cartCount = useCartItemCount();
  const { increment, reset } = useCartActions();
  const toast = useToast();

  function handleAddToCart(productName: string) {
    if (cartCount > 0) {
      setConfirmSwitchStore(true);
      return;
    }
    addToCart(productName);
  }

  function confirmAddToCart(productName: string) {
    reset();
    increment(1);
    toast.show(`${productName} ajouté au cabas.`, "success");
    setConfirmSwitchStore(false);
  }

  function handleApplyVoucher(code: string) {
    navigator.clipboard?.writeText(code).catch(() => undefined);
    toast.show(`Code ${code} copié — appliquez-le au moment de payer.`, "success");
  }

  function renderActionButton(variant: "primary-md" | "accent" | "soft") {
    switch (action.kind) {
      case "link":
        return (
          <ButtonLink href={action.href} variant={variant} className="w-full justify-center sm:w-auto">
            {action.label}
          </ButtonLink>
        );
      case "add-to-cart":
        return (
          <Button variant={variant} className="w-full justify-center sm:w-auto" onClick={() => handleAddToCart(action.productName)}>
            {action.label}
          </Button>
        );
      case "open-qr":
        return (
          <Button variant={variant} className="w-full justify-center sm:w-auto" onClick={() => setQrOpen(true)}>
            {action.label}
          </Button>
        );
      case "apply-voucher":
        return (
          <Button variant={variant} className="w-full justify-center sm:w-auto" onClick={() => handleApplyVoucher(action.code)}>
            {action.label}
          </Button>
        );
      default: {
        const exhaustive: never = action;
        throw new Error(`Unhandled notification action: ${JSON.stringify(exhaustive)}`);
      }
    }
  }

  return (
    <li
      className={`relative flex flex-col gap-3 rounded-2xl border-l-4 bg-surface p-5 shadow-card sm:flex-row sm:items-start ${
        notification.isRead ? "border-l-transparent" : ACCENT_CLASSES[config.accentTone]
      }`}
    >
      {!notification.isRead && <span className="sr-only">Non lue</span>}

      <IconTile icon={config.icon} tone={ICON_TILE_TONE[config.iconTone]} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-bold text-foreground-strong">{notification.title}</h3>
          {badge && (
            <Chip tone={badge.tone} size="sm" shape="pill">
              {badge.text}
            </Chip>
          )}
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{notification.description}</p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name={config.icon} size={13} decorative />
          {contextLabel}
          <span aria-hidden>•</span>
          <Icon name="clock" size={13} decorative />
          <time dateTime={notification.createdAtIso}>{formatRelativeTime(notification.createdAtIso, now)}</time>
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-1.5 sm:items-end">
        {renderActionButton(notification.isRead ? "soft" : config.unreadButtonVariant)}
        {!notification.isRead && (
          <button
            type="button"
            aria-label={`Marquer « ${notification.title} » comme lue`}
            onClick={() => markAsRead.mutate(notification.id)}
            className="text-center text-xs font-semibold text-muted-foreground hover:text-foreground-strong hover:underline"
          >
            Marquer lu
          </button>
        )}
      </div>

      {notification.type === "order-ready" && <QrCodeDialog order={notification.order} open={qrOpen} onClose={() => setQrOpen(false)} />}

      <Dialog open={confirmSwitchStore} onClose={() => setConfirmSwitchStore(false)} title="Changer de boutique ?">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">Votre panier contient déjà des articles d&apos;une autre boutique. Continuer le videra.</p>
          <div className="flex justify-end gap-2">
            <Button variant="soft" onClick={() => setConfirmSwitchStore(false)}>
              Annuler
            </Button>
            <Button variant="primary-md" onClick={() => action.kind === "add-to-cart" && confirmAddToCart(action.productName)}>
              Confirmer
            </Button>
          </div>
        </div>
      </Dialog>
    </li>
  );
}
