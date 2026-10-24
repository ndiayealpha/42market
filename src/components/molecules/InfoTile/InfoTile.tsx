import { IconTile, type IconTileTone } from "@/src/components/atoms/IconTile/IconTile";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface InfoTileProps {
  icon: IconName;
  title: string;
  subtitle: string;
  /** "card": white rounded card, icon beside text (P3). "tile": beige inline tile (K5, S2). "card-stacked": white card, icon above text (ReassuranceBand's "cards" variant). */
  layout?: "card" | "tile" | "card-stacked";
  tone?: IconTileTone;
  className?: string;
}

/**
 * Icon + title + subtitle — feeds P3 (ProductFactsStrip), K5
 * (CheckoutReassuranceRow) and S2's two beige promise tiles from the same
 * component and the same config-table pattern (rule: "une seule brique,
 * alimentée par des tables de config"). Nothing like it existed before
 * (Phase 0 audit) that fit this exact 3-part shape.
 */
export function InfoTile({ icon, title, subtitle, layout = "card", tone = "neutral", className = "" }: InfoTileProps) {
  if (layout === "tile") {
    return (
      <div className={`flex items-center gap-3 rounded-xl bg-catalog-chip p-3 ${className}`}>
        <Icon name={icon} size={18} className="shrink-0 text-foreground-strong" decorative />
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground-strong">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    );
  }

  if (layout === "card-stacked") {
    return (
      <div className={`flex flex-col gap-3 rounded-xl bg-surface p-4 ${className}`}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-catalog-chip">
          <Icon name={icon} size={20} className="text-foreground" decorative />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground-strong">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 rounded-xl bg-surface p-4 ${className}`}>
      <IconTile icon={icon} tone={tone} size={36} />
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground-strong">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
