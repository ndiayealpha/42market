import type { Metadata } from "next";

import { parseArticleKindFilter } from "@/src/domain/article";
import { CarnetView } from "@/src/features/carnet/CarnetView";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Le Carnet du Terroir | 42 Markets",
  description: "Recettes, guides d'épices, portraits d'épiciers et astuces anti-gaspi des terroirs du monde, racontés par vos commerçants de quartier.",
  alternates: { canonical: routes.main.carnet },
};

interface PageProps {
  searchParams: Promise<{ cat?: string; q?: string }>;
}

/** Public, crawlable hub — same `PROTECTED_EXCEPTIONS` treatment as `faq`/`howItWorks`. */
export default async function CarnetPage({ searchParams }: PageProps) {
  const { cat, q } = await searchParams;
  return <CarnetView kind={parseArticleKindFilter(cat)} query={q ?? ""} />;
}
