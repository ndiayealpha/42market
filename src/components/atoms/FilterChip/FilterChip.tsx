import Link from "next/link";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface FilterChipProps {
  href: string;
  label: string;
  icon?: IconName;
  isActive: boolean;
  /** "default": promo-type chips, bold with an icon. "compact": the rayon row underneath, smaller and icon-less. */
  size?: "default" | "compact";
}

/**
 * A URL filter, not client-side state (rule: "des filtres d'URL qui
 * rechargent les données, pas du filtrage client") — always a real link,
 * never a `<button onClick>`. Nothing like it existed before (Phase 0
 * audit): new primitive.
 */
export function FilterChip({ href, label, icon, isActive, size = "default" }: FilterChipProps) {
  const isCompact = size === "compact";

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors ${
        isCompact ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm"
      } ${isActive ? "bg-foreground-strong text-white" : "bg-surface text-foreground-strong hover:bg-catalog-chip-hover"}`}
    >
      {icon && !isCompact && <Icon name={icon} size={14} decorative />}
      {label}
    </Link>
  );
}
