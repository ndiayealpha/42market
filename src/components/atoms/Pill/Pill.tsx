import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface PillProps {
  label: string;
  /** Shown after " · " — e.g. a deadline next to a promo name. */
  secondaryLabel?: string;
  icon?: IconName;
  /** "badge": 24px tall, promo category/callout. "tag": 28px tall, card footer info chip. */
  variant: "badge" | "tag";
  bg: string;
  fg: string;
  /** Defaults to `fg`. */
  iconColor?: string;
  className?: string;
}

/**
 * One themeable pill label. `variant="badge"` is the PromoCard's
 * top-left category callout; `variant="tag"` is its bottom-row info
 * chip — same shape, different size/weight, so one component covers
 * both rather than two near-identical ones.
 */
export function Pill({ label, secondaryLabel, icon, variant, bg, fg, iconColor, className = "" }: PillProps) {
  const isBadge = variant === "badge";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full ${
        isBadge ? "h-6 px-3 text-[11px] font-bold uppercase tracking-[0.06em]" : "h-7 px-3.5 text-xs font-bold"
      } ${className}`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {icon && <Icon name={icon} size={isBadge ? 14 : 16} style={{ color: iconColor ?? fg }} decorative />}
      {label}
      {secondaryLabel && (
        <>
          <span aria-hidden className="opacity-70">
            ·
          </span>
          {secondaryLabel}
        </>
      )}
    </span>
  );
}
