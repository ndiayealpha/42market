import Link from "next/link";

import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { NewArrivalProduct } from "@/src/domain/new-arrival";
import { useAddProductToCart } from "@/src/hooks/useAddProductToCart";
import { formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface NewArrivalCardProps {
  product: NewArrivalProduct;
  storeName: string;
}

const STATUS_DOT_CLASSES: Record<NewArrivalProduct["status"]["tone"], string> = {
  success: "bg-catalog-success",
  danger: "bg-catalog-danger",
};

const STATUS_TEXT_CLASSES: Record<NewArrivalProduct["status"]["tone"], string> = {
  success: "text-catalog-success",
  danger: "text-catalog-danger",
};

/** Mirrors `ProductCard`'s "deal" variant layout (same image/footer shape) — a distinct card because a new arrival has no discount pair, just a price + unit, origin/detail and a stock-status dot instead of a packaging label. */
export function NewArrivalCard({ product, storeName }: NewArrivalCardProps) {
  const { addToCart, dialog } = useAddProductToCart();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface">
      <ProductImage
        src={product.image.src}
        alt={product.image.alt}
        aspectRatio="1/1"
        fit={product.image.fit}
        sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
        topLeft={
          product.badge ? (
            <Chip tone={product.badge.tone === "danger" ? "danger" : "cream"} size="sm" className="font-bold">
              {product.badge.label}
            </Chip>
          ) : undefined
        }
      />

      <div className="flex flex-1 flex-col p-3">
        <p className="flex items-baseline gap-1 text-base font-bold text-foreground-strong">
          {formatPrice(product.price)}
          <span className="text-xs font-medium text-muted-foreground">{product.unit}</span>
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground-strong">
          <Link href={routes.main.epicerieProduit(product.storeSlug, product.productSlug)} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {product.origin} • {product.detail}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className={`flex items-center gap-1.5 text-xs font-semibold ${STATUS_TEXT_CLASSES[product.status.tone]}`}>
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_CLASSES[product.status.tone]}`} />
            {product.status.label}
          </p>
          <AddToCartButton
            productName={product.name}
            onAdd={() =>
              addToCart({
                id: product.id,
                name: product.name,
                packagingLabel: product.unit.replace(/^\/\s*/, ""),
                price: product.price,
                image: product.image,
                storeSlug: product.storeSlug,
                storeName,
              })
            }
            size="md"
            className="relative z-10 shrink-0"
          />
          {dialog}
        </div>
      </div>
    </div>
  );
}
