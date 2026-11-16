import type { Metadata } from "next";

import { AboutTemplate } from "@/src/features/about/AboutTemplate";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "À propos de 42 Markets | Le goût de chez nous, partout en France",
  description: "L'histoire de Sam & Amadou et le manifeste derrière 42 Markets, la marketplace des épiceries de quartier indépendantes.",
  alternates: { canonical: routes.main.about },
};

/** Public, crawlable marketing page — same `PROTECTED_EXCEPTIONS` treatment as `howItWorks`. */
export default function AboutPage() {
  return <AboutTemplate />;
}
