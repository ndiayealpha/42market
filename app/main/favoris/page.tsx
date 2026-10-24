import type { Metadata } from "next";

import { parseFavoritesSort, parseFavoritesTab, parseTerroirRegionFilter } from "@/src/domain/favorites";
import { verifySession } from "@/src/features/auth/server";
import { FavoritesView } from "@/src/features/favorites/FavoritesView";
import { routes } from "@/src/lib/routing/routes";
import { mockProfileRepository } from "@/src/services/profile.repository";

interface PageProps {
  searchParams: Promise<{ onglet?: string; tri?: string; terroir?: string; stock?: string; boutiques?: string; q?: string }>;
}

export const metadata: Metadata = {
  title: "Mes favoris | 42 Markets",
  robots: { index: false, follow: false },
};

/** Protected (rule 7) — the first real use of `verifySession` outside the per-store pages. */
export default async function FavoritesPage({ searchParams }: PageProps) {
  const user = await verifySession(routes.main.favorites);
  const { onglet, tri, terroir, stock, boutiques, q } = await searchParams;

  const profile = await mockProfileRepository.getProfile(user.id);
  const now = new Date();
  const lastSyncedAtIso = new Date(now.getTime() - 8 * 60_000).toISOString();

  return (
    <FavoritesView
      cityName={profile?.city ?? "Saint-Étienne"}
      activeTab={parseFavoritesTab(onglet)}
      sort={parseFavoritesSort(tri)}
      terroirRegion={parseTerroirRegionFilter(terroir)}
      inStockOnly={stock === "1"}
      storeSlugs={boutiques ? boutiques.split(",").filter(Boolean) : []}
      query={q ?? ""}
      now={now}
      lastSyncedAtIso={lastSyncedAtIso}
    />
  );
}
