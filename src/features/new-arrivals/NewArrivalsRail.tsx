"use client";

import { Carousel } from "@/src/components/organisms/Carousel/Carousel";
import type { NewArrivalProduct, NewArrivalStoreRef } from "@/src/domain/new-arrival";

import { NewArrivalCard } from "./NewArrivalCard";

export interface NewArrivalsRailProps {
  products: NewArrivalProduct[];
  stores: NewArrivalStoreRef[];
  ariaLabel: string;
}

/** The per-section product rail — mirrors `ProductRail`'s "deal" branch, with `NewArrivalCard` in place of `ProductCard`. */
export function NewArrivalsRail({ products, stores, ariaLabel }: NewArrivalsRailProps) {
  const storeNameBySlug = new Map(stores.map((store) => [store.slug, store.name]));

  return (
    <div role="region" aria-roledescription="carousel" aria-label={ariaLabel} className="relative">
      <Carousel
        items={products}
        rows={1}
        rowHeights={[320, 320]}
        getKey={(product) => product.id}
        renderItem={(product) => (
          <div className="w-[160px] sm:w-[190px]">
            <NewArrivalCard product={product} storeName={storeNameBySlug.get(product.storeSlug) ?? stores[0]?.name ?? ""} />
          </div>
        )}
      />
    </div>
  );
}
