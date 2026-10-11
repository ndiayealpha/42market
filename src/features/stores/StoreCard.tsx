import Link from "next/link";

import { Card } from "@/src/components/atoms/Card/Card";
import { RatingBadge } from "@/src/components/atoms/RatingBadge/RatingBadge";
import { Thumbnail } from "@/src/components/atoms/Thumbnail/Thumbnail";
import type { Store } from "@/src/domain/store";

import { PickupBar } from "./PickupBar";
import { StoreMeta } from "./StoreMeta";

export interface StoreCardProps {
  store: Store;
}

/** One card for both "Épiceries près de vous" and "Épiceries de la ville" — only the data differs. The whole card is a stretched link via the name's `after:absolute after:inset-0`. */
export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card variant="elevated" className="group relative flex h-full flex-col">
      <div className="flex min-w-0 items-center gap-4">
        <Thumbnail
          src={store.image.src}
          alt={store.image.alt}
          size={80}
          fit={store.image.fit}
          className="!h-16 !w-16 sm:!h-20 sm:!w-20"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <Link
              href={store.href}
              className="truncate text-[20px] leading-6 font-bold text-foreground-strong outline-none after:absolute after:inset-0 after:rounded-2xl sm:text-2xl sm:leading-7 focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-foreground-strong"
            >
              {store.name}
            </Link>
            <RatingBadge value={store.rating} className="ml-auto shrink-0" />
          </div>
          <StoreMeta distanceMeters={store.distanceMeters} status={store.status} description={store.description} />
        </div>
      </div>
      <div className="mt-auto pt-4">
        <PickupBar minutes={store.pickupMinutes} promo={store.promo} />
      </div>
    </Card>
  );
}
