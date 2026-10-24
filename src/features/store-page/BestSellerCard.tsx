import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Card } from "@/src/components/atoms/Card/Card";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { BestSeller } from "@/src/domain/store-merchandising";
import { formatPrice } from "@/src/lib/format";

export interface BestSellerCardProps {
  bestSeller: BestSeller;
  onAdd: () => void;
}

export function BestSellerCard({ bestSeller, onAdd }: BestSellerCardProps) {
  return (
    <Card variant="outlined" className="flex items-center gap-3">
      <ProductImage src={bestSeller.image.src} alt={bestSeller.image.alt} aspectRatio="1/1" sizes="64px" className="h-16 w-16 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-store-accent-gold px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground-strong uppercase">
          N°{bestSeller.rank} des ventes
        </span>
        <p className="mt-1 truncate font-semibold text-foreground-strong">{bestSeller.name}</p>
        <p className="text-xs text-ink-muted">
          {formatPrice(bestSeller.price)}/{bestSeller.unitLabel}
        </p>
      </div>
      <AddToCartButton productName={bestSeller.name} onAdd={onAdd} size="md" />
    </Card>
  );
}
