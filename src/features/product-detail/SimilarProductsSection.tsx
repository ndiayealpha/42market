import { Section } from "@/src/components/layout/Section/Section";
import type { RelatedProduct } from "@/src/domain/product-cards";
import { ProductCard } from "@/src/features/catalog/ProductCard";

export interface SimilarProductsSectionProps {
  products: RelatedProduct[];
}

/** P9 — the existing `ProductCard` "related" preset, reused as-is (not modified). Hidden entirely when there's nothing to show, never an empty section. */
export function SimilarProductsSection({ products }: SimilarProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <Section id="similar-products" title="Produits similaires">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} variant="related" product={product} />
        ))}
      </div>
    </Section>
  );
}
