export interface FaqItem {
  id: string;
  /** URL-safe fragment for deep-linking, e.g. `/main/faq#paiement-especes`. */
  slug: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

/** Stable question order, independent of fixture insertion order. */
export function sortFaqItems(items: FaqItem[]): FaqItem[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function filterFaqItemsByCategory(items: FaqItem[], category: string | null): FaqItem[] {
  if (!category) return items;
  return items.filter((item) => item.category === category);
}

export interface FaqJsonLdInput {
  items: FaqItem[];
  canonicalUrl: string;
}

/** Mirrors `buildProductJsonLd`'s shape/escaping exactly (same `</script>`-injection guard). */
export function buildFaqJsonLd({ items }: FaqJsonLdInput): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}
