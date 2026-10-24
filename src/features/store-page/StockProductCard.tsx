import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Card } from "@/src/components/atoms/Card/Card";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { getStockStatusLabel, type LimitedStockItem } from "@/src/domain/store-merchandising";
import { formatPrice } from "@/src/lib/format";

export interface StockProductCardProps {
  item: LimitedStockItem;
  onAdd: () => void;
}

export function StockProductCard({ item, onAdd }: StockProductCardProps) {
  const isOutOfStock = item.status === "out-of-stock";

  return (
    <Card variant="outlined" className="flex h-full flex-col overflow-hidden !p-0">
      <ProductImage
        src={item.image.src}
        alt={item.image.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
        bottomLeft={
          <Badge variant="label" color={isOutOfStock ? "danger" : "success"} uppercase={false}>
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            {getStockStatusLabel(item)}
          </Badge>
        }
      />
      <div className="flex flex-1 flex-col p-4">
        <p className="font-semibold text-foreground-strong">{item.name}</p>
        <p className="mt-0.5 text-xs text-ink-muted">{item.subtitle}</p>
        <div className="mt-auto flex items-center justify-between border-t border-catalog-line-light pt-3">
          <span className={isOutOfStock ? "text-base text-catalog-faint line-through" : "text-base font-bold text-foreground-strong"}>
            {formatPrice(item.price)}
          </span>
          <AddToCartButton
            productName={item.name}
            onAdd={onAdd}
            unavailable={isOutOfStock}
            size="md"
            bg={isOutOfStock ? "var(--color-catalog-chip)" : "var(--color-foreground-strong)"}
            fg={isOutOfStock ? "var(--color-catalog-faint)" : "#FFFFFF"}
          />
        </div>
      </div>
    </Card>
  );
}
