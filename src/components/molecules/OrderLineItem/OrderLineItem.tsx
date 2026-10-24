import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { computeLineTotal, type CartLine } from "@/src/domain/cart";
import { formatPrice } from "@/src/lib/format";

export interface OrderLineItemProps {
  line: Pick<CartLine, "id" | "name" | "packagingLabel" | "quantity" | "unitPrice" | "image" | "accrocheLabel">;
  className?: string;
}

/** The one cart-line row shared by Page K's recap and Page S's "Articles réservés" (rule: "même composant, mêmes lignes" — fixes incohérence #5's "3 articles" vs "3 références" by leaving the count label to the caller). Nothing like it existed before (Phase 0 audit). */
export function OrderLineItem({ line, className = "" }: OrderLineItemProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ProductImage src={line.image.src} alt={line.image.alt} aspectRatio="1/1" sizes="48px" className="h-12 w-12 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground-strong">
          {line.name}
          {line.quantity > 1 ? ` × ${line.quantity}` : ""}
        </p>
        <p className="truncate text-xs text-muted-foreground">{line.packagingLabel}</p>
        {line.accrocheLabel && <p className="text-xs font-semibold text-success">{line.accrocheLabel}</p>}
      </div>
      <p className="shrink-0 text-sm font-bold text-foreground-strong">{formatPrice(computeLineTotal(line))}</p>
    </div>
  );
}
