import type { Metadata } from "next";

import { buildFaqJsonLd } from "@/src/domain/faq";
import { FaqTemplate } from "@/src/features/faq/FaqTemplate";
import { routes } from "@/src/lib/routing/routes";
import { mockFaqRepository } from "@/src/services/faq.repository";

export const metadata: Metadata = {
  title: "FAQ Diaspora & Connaissance du Marché | 42 Markets",
  description: "Réponses aux questions fréquentes sur les arrivages, le paiement, le Click & Collect et les services de nos épiceries partenaires.",
  alternates: { canonical: routes.main.faq },
};

/** Public, crawlable page — same `PROTECTED_EXCEPTIONS` treatment as `howItWorks`, no `verifySession`. */
export default async function FaqPage() {
  const items = await mockFaqRepository.list();
  const jsonLd = buildFaqJsonLd({ items, canonicalUrl: routes.main.faq });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <FaqTemplate items={items} />
    </>
  );
}
