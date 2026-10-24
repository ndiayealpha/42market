import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export type IconTileTone = "neutral" | "cream" | "success" | "dark";

const TONE_CLASSES: Record<IconTileTone, string> = {
  neutral: "bg-catalog-chip text-foreground-strong",
  cream: "bg-catalog-badge-cream text-foreground-strong",
  success: "bg-success-subtle text-success",
  dark: "bg-foreground-strong text-white",
};

export interface IconTileProps {
  icon: IconName;
  tone?: IconTileTone;
  size?: number;
  className?: string;
}

/** A square-rounded icon tile — the leading visual on a notification card, a banner, or a settings row. Nothing like it existed before (Phase 0 audit). */
export function IconTile({ icon, tone = "neutral", size = 40, className = "" }: IconTileProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[tone]} ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon name={icon} size={Math.round(size * 0.45)} decorative />
    </span>
  );
}
