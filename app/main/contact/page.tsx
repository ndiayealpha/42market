import type { Metadata } from "next";

import { isContactMotif } from "@/src/domain/contact";
import { ContactTemplate } from "@/src/features/contact/ContactTemplate";
import { routes } from "@/src/lib/routing/routes";
import { mockCatalogRepository } from "@/src/services/catalog.repository";

export const metadata: Metadata = {
  title: "Contactez-nous | 42 Markets",
  description: "Une question sur un arrivage, un produit introuvable ou votre commande ? Écrivez-nous, nous répondons sous 24h.",
  alternates: { canonical: routes.main.contact },
};

interface PageProps {
  searchParams: Promise<{ motif?: string; epicerie?: string }>;
}

/** Public, crawlable page — same `PROTECTED_EXCEPTIONS` treatment as `howItWorks`/`faq`. Accepts `?motif=` (e.g. from Footer's "Signaler un problème") and `?epicerie=` (from a store page's "Signaler un problème avec cette épicerie") to prefill the form. */
export default async function ContactPage({ searchParams }: PageProps) {
  const { motif, epicerie } = await searchParams;
  const stores = await mockCatalogRepository.getAllStores();
  const storeOptions = stores.map((store) => ({ value: store.id, label: store.name }));

  return (
    <ContactTemplate
      storeOptions={storeOptions}
      initialMotif={motif && isContactMotif(motif) ? motif : undefined}
      initialStoreSlug={epicerie && stores.some((store) => store.id === epicerie) ? epicerie : undefined}
    />
  );
}
