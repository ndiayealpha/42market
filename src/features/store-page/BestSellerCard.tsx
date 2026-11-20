import Link from "next/link";

import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Card } from "@/src/components/atoms/Card/Card";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { BestSeller } from "@/src/domain/store-merchandising";
import { formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface BestSellerCardProps {
  bestSeller: BestSeller;
  storeSlug: string;
  onAdd: () => void;
}

/** The whole card links to the product's fiche — `bestSeller.id` doubles as its slug (no separate `productSlug` field exists on `BestSeller`). */
export function BestSellerCard({ bestSeller, storeSlug, onAdd }: BestSellerCardProps) {
  return (
    <Card variant="outlined" className="relative flex items-center gap-3">
      <ProductImage src={bestSeller.image.src} alt={bestSeller.image.alt} aspectRatio="1/1" sizes="64px" className="h-16 w-16 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-store-accent-gold px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground-strong uppercase">
          N°{bestSeller.rank} des ventes
        </span>
        <Link href={routes.main.epicerieProduit(storeSlug, bestSeller.id)} className="mt-1 block truncate font-semibold text-foreground-strong after:absolute after:inset-0">
          {bestSeller.name}
        </Link>
        <p className="text-xs text-ink-muted">
          {formatPrice(bestSeller.price)}/{bestSeller.unitLabel}
        </p>
      </div>
      <AddToCartButton productName={bestSeller.name} onAdd={onAdd} size="md" className="relative z-10" />
    </Card>
  );
}
