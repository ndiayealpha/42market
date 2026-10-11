import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface TrustBadgeProps {
  icon: IconName;
  label: string;
  className?: string;
}

/**
 * One inline reassurance badge (icon + label, single line) — the
 * signup footer's "Chiffrement 256-bit SSL" / "Conforme RGPD & CNIL" /
 * "Écosystème Circulaire" row. Deliberately smaller/flatter than
 * `TrustItem` (which carries a two-line title+description in the
 * marketing footer) — different shape for a different context, not a
 * variant of the same component.
 */
export function TrustBadge({ icon, label, className = "" }: TrustBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-auth-ink-muted ${className}`}>
      <Icon name={icon} size={14} className="shrink-0" decorative />
      {label}
    </span>
  );
}
