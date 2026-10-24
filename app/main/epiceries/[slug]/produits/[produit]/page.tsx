import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildProductJsonLd } from "@/src/domain/product-detail";
import { ProductDetailView } from "@/src/features/product-detail/ProductDetailView";
import { routes } from "@/src/lib/routing/routes";
import { mockProductDetailRepository } from "@/src/services/product-detail.repository";

interface PageProps {
  params: Promise<{ slug: string; produit: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, produit } = await params;
  const product = await mockProductDetailRepository.getProduct(slug, produit);

  if (!product) {
    return { title: "Produit introuvable | 42 Markets" };
  }

  return {
    title: `${product.name} — ${product.storeName} | 42 Markets`,
    description: product.description[0],
    alternates: { canonical: routes.main.epicerieProduit(slug, produit) },
  };
}

/**
 * Page P — "Fiche produit". PUBLIC and indexable (no `verifySession`, same
 * treatment as `app/main/bons-plans/page.tsx`): favorites/cart actions work
 * the same for anonymous visitors here as everywhere else in the app. Made
 * possible by the additive `PROTECTED_EXCEPTION_PATTERNS` entry in
 * `routes.ts` (see that file's comment, flagged in the compte-rendu).
 */
export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, produit } = await params;
  const product = await mockProductDetailRepository.getProduct(slug, produit);

  if (!product) {
    notFound();
  }

  const jsonLd = buildProductJsonLd({ product, canonicalUrl: routes.main.epicerieProduit(slug, produit) });

  return (
    <>
      {/* `buildProductJsonLd` already escapes its own output against `</script>` injection — the one legitimate use of `dangerouslySetInnerHTML` on this page. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ProductDetailView storeSlug={slug} productSlug={produit} />
    </>
  );
}
