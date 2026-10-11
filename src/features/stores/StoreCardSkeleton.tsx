import { Card } from "@/src/components/atoms/Card/Card";

/** Same dimensions as `StoreCard`, reusing `Card` — shown while `useNearbyStores`/`useCityStores` are loading. */
export function StoreCardSkeleton() {
  return (
    <Card variant="elevated" className="flex h-full flex-col" aria-hidden>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-md bg-catalog-chip sm:h-20 sm:w-20 sm:rounded-lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 w-2/3 animate-pulse rounded bg-catalog-chip" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-catalog-chip" />
          <div className="h-3 w-full animate-pulse rounded bg-catalog-chip" />
        </div>
      </div>
      <div className="mt-auto pt-4">
        <div className="h-[46px] animate-pulse rounded-xl bg-surface-subtle" />
      </div>
    </Card>
  );
}
