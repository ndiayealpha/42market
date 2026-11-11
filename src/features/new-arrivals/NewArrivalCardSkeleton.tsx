/** Same dimensions as `NewArrivalCard` — shown while `useNewArrivalSections` is loading. */
export function NewArrivalCardSkeleton() {
  return (
    <div aria-hidden className="flex h-full flex-col overflow-hidden rounded-xl bg-surface">
      <div className="aspect-square w-full animate-pulse bg-catalog-chip" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="h-5 w-1/3 animate-pulse rounded bg-catalog-chip" />
        <div className="h-4 w-full animate-pulse rounded bg-catalog-chip" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-catalog-chip" />
        <div className="mt-auto h-9 w-9 animate-pulse rounded-full bg-catalog-chip" />
      </div>
    </div>
  );
}
