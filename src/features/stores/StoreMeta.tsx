import { Icon } from "@/src/components/atoms/Icon/Icon";
import { getStatusLabel, type StoreStatus } from "@/src/domain/store";
import { formatDistance } from "@/src/lib/format";

export interface StoreMetaProps {
  distanceMeters: number;
  status: StoreStatus;
  description: string;
}

/** The distance/status row + the description line beneath a store's name. */
export function StoreMeta({ distanceMeters, status, description }: StoreMetaProps) {
  const isOpen = status.kind === "open";

  return (
    <div className="min-w-0">
      <div className="mt-1.5 flex items-center text-xs">
        <Icon name="location" size={14} className="text-foreground-strong" />
        <span className="ml-0.5 font-semibold text-ink-muted">{formatDistance(distanceMeters)}</span>
        <span aria-hidden className="mx-2 text-ink-muted">
          ·
        </span>
        <span className={`font-bold ${isOpen ? "text-catalog-success" : "text-catalog-danger"}`}>{getStatusLabel(status)}</span>
      </div>
      <p className="mt-0.5 truncate text-xs font-medium text-ink-muted" title={description}>
        {description}
      </p>
    </div>
  );
}
