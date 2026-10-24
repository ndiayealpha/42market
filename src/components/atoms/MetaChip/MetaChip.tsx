import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface MetaChipProps {
  icon: IconName;
  label: string;
  className?: string;
}

/** A small white, bordered pill with a leading icon — e.g. "15-30 min" / "0 € de frais de retrait" on `ExclusiveOrderBanner`. Nothing like it existed before (Phase 0 audit). */
export function MetaChip({ icon, label, className = "" }: MetaChipProps) {
  return (
    <span className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-foreground-strong ${className}`}>
      <Icon name={icon} size={14} className="text-muted-foreground" decorative />
      {label}
    </span>
  );
}
