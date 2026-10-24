import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import type { Product } from "@/src/domain/catalog";

import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: Product[];
}

/** Knows only `Product[]` — all card markup lives in `ProductCard` (rule 5). */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <CardGrid columns={6}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard variant="catalog" product={product} />
        </li>
      ))}
    </CardGrid>
  );
}
