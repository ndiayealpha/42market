import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";
import type { OrderStatus, OrderStatusConfig } from "@/src/domain/orders";
import { getOrderStatusConfig } from "@/src/domain/orders";

const TONE_CLASSES: Record<OrderStatusConfig["tone"], string> = {
  success: "bg-success-subtle text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

const TONE_ICONS: Record<OrderStatusConfig["tone"], IconName> = {
  success: "check-circle",
  info: "clock",
  warning: "clock",
  danger: "close",
};

export interface OrderStatusPillProps {
  status: OrderStatus;
}

export function OrderStatusPill({ status }: OrderStatusPillProps) {
  const config = getOrderStatusConfig(status);
  return (
    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${TONE_CLASSES[config.tone]}`}>
      <Icon name={TONE_ICONS[config.tone]} size={16} decorative />
    </span>
  );
}
