import type { Metadata } from "next";

import { EpiceriesListingView } from "@/src/features/stores/EpiceriesListingView";
import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Toutes les épiceries | 42 Markets",
};

export default async function EpiceriesPage() {
  await verifySession(routes.main.epiceries);

  return <EpiceriesListingView />;
}
