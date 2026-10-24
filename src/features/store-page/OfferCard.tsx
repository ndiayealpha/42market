import Link from "next/link";

import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { Offer } from "@/src/domain/store-merchandising";
import { computeUnitPricePerKg, formatPrice, formatUnitPrice } from "@/src/lib/format";

export interface OfferCardProps {
  offer: Offer;
  onAdd: () => void;
}

/** Either a struck former price (real discount) or a computed unit price (per-kg) — the maquette never shows both on one card. */
function PriceRow({ price }: { price: Offer["price"] }) {
  return (
    <p className="mt-2 flex items-baseline gap-1.5">
      <span className="text-base font-bold text-foreground-strong">{formatPrice(price.amount)}</span>
      {price.compareAt != null && <s className="text-xs text-catalog-faint">{formatPrice(price.compareAt)}</s>}
      {price.compareAt == null && price.weightGrams != null && (
        <span className="text-xs text-ink-muted">{formatUnitPrice(computeUnitPricePerKg(price.amount, price.weightGrams))}</span>
      )}
    </p>
  );
}

export function OfferCard({ offer, onAdd }: OfferCardProps) {
  const isBasket = offer.kind === "basket";

  return (
    <div className={`w-[200px] shrink-0 overflow-hidden rounded-xl ${isBasket ? "bg-success-subtle" : "bg-surface"}`}>
      <ProductImage
        src={offer.image.src}
        alt={offer.image.alt}
        aspectRatio="1/1"
        sizes="200px"
        topLeft={
          <span
            className={`rounded-full px-2 py-1 text-[11px] font-bold text-white ${isBasket ? "bg-catalog-success" : "bg-catalog-danger"}`}
          >
            {offer.badge}
          </span>
        }
        bottomRight={<AddToCartButton productName={offer.title} onAdd={onAdd} size="md" />}
      />
      <div className="p-3">
        <PriceRow price={offer.price} />
        <p className="mt-1 line-clamp-2 text-xs font-medium text-foreground-strong">{offer.title}</p>
        {isBasket && (
          <>
            <p className="mt-1 flex items-center justify-between text-xs text-ink-muted">
              <span>~{offer.approxWeightKg} kg</span>
              <span>{offer.sellerName}</span>
            </p>
            <Link
              href={offer.allBasketsHref}
              className="mt-2 flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs font-semibold text-foreground-strong"
            >
              Tous les paniers
              <Icon name="chevron-right" size={14} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
