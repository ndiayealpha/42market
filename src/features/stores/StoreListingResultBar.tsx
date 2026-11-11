import { formatStoreCountLabel } from "@/src/domain/store-listing";

export interface StoreListingResultBarProps {
  count: number;
  neighborhood: string | null;
}

/** "18 épiceries correspondent à vos critères autour de Saint-Étienne Centre" + the pickup-guarantee reassurance line. */
export function StoreListingResultBar({ count, neighborhood }: StoreListingResultBarProps) {
  return (
    <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="font-semibold text-foreground-strong">
        {formatStoreCountLabel(count)}{" "}
        <span className="font-normal text-ink-muted">correspondent à vos critères autour de</span> {neighborhood ?? "Saint-Étienne Centre"}
      </p>
      <p className="text-ink-muted">Retrait garanti au comptoir de chaque commerçant</p>
    </div>
  );
}
