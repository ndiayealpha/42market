"use client";

import { Carousel } from "@/src/components/organisms/Carousel/Carousel";
import { RailArrows } from "@/src/components/organisms/Carousel/RailArrows";
import { useCarousel } from "@/src/components/organisms/Carousel/useCarousel";
import type { PromoProduct } from "@/src/domain/promotions";
import type { DealProduct } from "@/src/domain/store-deals";

import { ProductCard } from "./ProductCard";

export type ProductRailProps =
  | {
      variant?: "promo";
      products: PromoProduct[];
      /** The featured rail has its own prev/next arrows; a category section's rail doesn't (swipe only on mobile, rule B4). */
      showArrows?: boolean;
      showStoreName?: boolean;
      ariaLabel: string;
    }
  | {
      /** The "Bons plans par épiceries" global page's per-store rail — `ProductCard`'s "deal" preset (contain image, `DealLabel` footer) instead of "promo". */
      variant: "deal";
      products: DealProduct[];
      showArrows?: boolean;
      ariaLabel: string;
    };

/** Knows only `PromoProduct[] | DealProduct[]` — all card markup lives in `ProductCard` (rule 5). Arrows, when shown, are driven by the same `useCarousel` hook as `OffersBanner`. */
export function ProductRail(props: ProductRailProps) {
  const { showArrows = false, ariaLabel } = props;
  const { containerRef, prev, next, canPrev, canNext, hasOverflow } = useCarousel();

  const arrows = showArrows && hasOverflow && (
    <RailArrows ariaLabel={`${ariaLabel} : produits`} onPrev={prev} onNext={next} canPrev={canPrev} canNext={canNext} className="mb-2 justify-end" />
  );

  if (props.variant === "deal") {
    return (
      <div role="region" aria-roledescription="carousel" aria-label={ariaLabel} className="relative">
        {arrows}
        <Carousel
          ref={containerRef}
          items={props.products}
          rows={1}
          rowHeights={[320, 320]}
          getKey={(product) => product.id}
          renderItem={(product) => (
            <div className="w-[160px] sm:w-[190px]">
              <ProductCard variant="deal" product={product} />
            </div>
          )}
        />
      </div>
    );
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={ariaLabel} className="relative">
      {arrows}
      <Carousel
        ref={containerRef}
        items={props.products}
        rows={1}
        rowHeights={[320, 320]}
        getKey={(product) => product.id}
        renderItem={(product) => (
          <div className="w-[160px] sm:w-[190px]">
            <ProductCard variant="promo" product={product} showStoreName={props.showStoreName} />
          </div>
        )}
      />
    </div>
  );
}
