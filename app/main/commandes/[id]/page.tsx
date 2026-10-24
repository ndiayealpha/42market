import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { ACCOUNT_SETTINGS, ADMIN_ACCOUNT_SETTINGS } from "@/src/data/account-settings.mock";
import { OrderTrackingView } from "@/src/features/order-tracking/OrderTrackingView";
import { verifySession } from "@/src/features/auth/server";
import { DEMO_CLAIMABLE_ORDER_ID, DEMO_ORDER_OWNER_COOKIE } from "@/src/lib/constants";
import { routes } from "@/src/lib/routing/routes";
import { mockOrderTrackingRepository } from "@/src/services/order-tracking.repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Always rendered fresh — an order's status/reminder state must never be
// served from a cache. Next's page-level Metadata API has no way to set a
// `Cache-Control` response header (only `<meta>` tags), so this is the
// best-effort private-data stance for a page: `force-dynamic` alone.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Commande ${id} — 42 Markets`,
    robots: { index: false, follow: false },
  };
}

export default async function OrderTrackingPage({ params }: PageProps) {
  const { id } = await params;
  const user = await verifySession(routes.main.orderDetail(id));

  const order = await mockOrderTrackingRepository.getOrderById(id);
  // The in-memory `ownerUserId` doesn't reliably reflect a claim made via
  // `/api/checkout/claim-order` (see that route's own doc comment) — the
  // cookie it sets is the real source of truth for who most recently
  // completed the demo checkout for this one claimable order.
  const claimedOwnerId = id === DEMO_CLAIMABLE_ORDER_ID ? (await cookies()).get(DEMO_ORDER_OWNER_COOKIE)?.value : undefined;
  const isOwner = order != null && (order.ownerUserId === user.id || claimedOwnerId === user.id);
  if (!order || !isOwner) {
    notFound();
  }

  const phoneVerified = (user.id === "2" ? ADMIN_ACCOUNT_SETTINGS : ACCOUNT_SETTINGS).isPhoneVerified;

  return <OrderTrackingView initialOrder={order} phoneVerified={phoneVerified} />;
}
