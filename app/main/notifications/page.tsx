import type { Metadata } from "next";

import { NOTIFICATIONS_NOW } from "@/src/data/notifications.mock";
import { parseNotificationCategoryFilter, parseNotificationStatusFilter } from "@/src/domain/notifications";
import { verifySession } from "@/src/features/auth/server";
import { NotificationsView } from "@/src/features/notifications/NotificationsView";
import { routes } from "@/src/lib/routing/routes";

interface PageProps {
  searchParams: Promise<{ statut?: string; categorie?: string }>;
}

export const metadata: Metadata = {
  title: "Notifications | 42 Markets",
  robots: { index: false, follow: false },
};

/** Protected (rule 7), same `verifySession` pattern as the Favoris page. */
export default async function NotificationsPage({ searchParams }: PageProps) {
  const user = await verifySession(routes.main.notifications);
  const { statut, categorie } = await searchParams;

  return (
    <NotificationsView
      // Frozen to match the fixture's authored dates (rule 6: "now" is injected, never read live) — the demo data would otherwise drift into the wrong "Aujourd'hui"/"Hier" bucket as real time passes, same latent limitation `FLASH_SALE`'s fixed date already has elsewhere in this prototype (see compte-rendu).
      now={NOTIFICATIONS_NOW}
      userId={user.id}
      statusFilter={parseNotificationStatusFilter(statut)}
      categoryFilter={parseNotificationCategoryFilter(categorie)}
    />
  );
}
