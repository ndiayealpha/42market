import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { LabeledDivider } from "@/src/components/atoms/LabeledDivider/LabeledDivider";
import type { FullOrder } from "@/src/domain/orders";
import { routes } from "@/src/lib/routing/routes";

import { OrderStatusHero } from "./OrderStatusHero";
import { OrderTrackingTimeline } from "./OrderTrackingTimeline";
import { OrderUtilityBar } from "./OrderUtilityBar";
import { PickupPassCard } from "./PickupPassCard";
import { ReservedItemsCard } from "./ReservedItemsCard";
import { SupportBar } from "./SupportBar";
import { TrackingStoreSection } from "./TrackingStoreSection";

export interface OrderTrackingTemplateProps {
  order: FullOrder;
  phoneVerified: boolean;
  now: Date;
}

/**
 * Pure composition of S0→S7 — no data fetching here, `OrderTrackingView`
 * owns that. Desktop (≥lg): S4+S5 stacked on the left, S6 on the right;
 * S7 full width below. DOM order (S4, S5, S6, S7) stays the natural
 * mobile reading order too.
 */
export function OrderTrackingTemplate({ order, phoneVerified, now }: OrderTrackingTemplateProps) {
  const postcode = order.store.city.match(/^\d+/)?.[0] ?? "";

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      <OrderUtilityBar order={order} />
      <OrderStatusHero order={order} phoneVerified={phoneVerified} />
      <PickupPassCard order={order} now={now} />
      <LabeledDivider>★ L&apos;engagement Circuit Court {postcode}</LabeledDivider>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 lg:col-start-1 lg:row-start-1">
          <OrderTrackingTimeline order={order} now={now} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <TrackingStoreSection store={order.store} />
        </div>
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <ReservedItemsCard order={order} />
        </div>
      </div>

      <div className="space-y-3">
        <ButtonLink variant="primary-lg" href={routes.main.home}>
          Retourner à l&apos;accueil du marché
        </ButtonLink>
        <SupportBar orderReference={order.reference} />
      </div>
    </div>
  );
}
