import { Card } from "@/src/components/atoms/Card/Card";

/** Same dimensions as `PreorderCard` — shown while `usePreorderCampaigns` is loading. */
export function PreorderCardSkeleton() {
  return (
    <Card variant="outlined" className="flex h-full flex-col" aria-hidden>
      <div className="flex gap-3">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-md bg-catalog-chip" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-catalog-chip" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-catalog-chip" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-catalog-chip" />
        </div>
      </div>
      <div className="mt-2.5 h-px w-full bg-catalog-line" />
      <div className="mt-2 h-6 animate-pulse rounded bg-catalog-chip" />
    </Card>
  );
}
