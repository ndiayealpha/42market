"use client";

import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { ArticleLinkedProduct } from "@/src/domain/article";
import { useAddProductToCart } from "@/src/hooks/useAddProductToCart";
import { formatPrice } from "@/src/lib/format";

export interface ArticleLinkedProductCardProps {
  product: ArticleLinkedProduct;
}

export function ArticleLinkedProductCard({ product }: ArticleLinkedProductCardProps) {
  const { addToCart, dialog } = useAddProductToCart();

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-surface p-3 shadow-card">
      <ProductImage src={product.image.src} alt={product.image.alt} aspectRatio="1/1" sizes="160px" className="rounded-lg" />
      <p className="line-clamp-2 text-xs font-semibold text-foreground-strong">{product.name}</p>
      <p className="text-xs text-muted-foreground">{product.packagingLabel}</p>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-foreground-strong">{formatPrice(product.price)}</span>
        <button
          type="button"
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              packagingLabel: product.packagingLabel,
              price: product.price,
              image: product.image,
              storeSlug: product.storeSlug,
              storeName: product.storeName,
            })
          }
          className="rounded-full bg-foreground-strong px-3 py-1.5 text-xs font-bold text-white hover:bg-catalog-cta-hover"
        >
          Ajouter
        </button>
      </div>
      {dialog}
    </div>
  );
}
