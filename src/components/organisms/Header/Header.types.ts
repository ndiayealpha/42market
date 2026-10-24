import type { BadgeColor } from "@/src/components/atoms/Badge/Badge";
import type { IconName } from "@/src/components/atoms/Icon/Icon";

export interface NavigationItemConfig {
  label: string;
  href: string;
  /** Rendered right after the label. */
  suffix?: "fire" | "new" | "chevron";
}

export interface HeaderActionConfig {
  key: string;
  icon: IconName;
  label: string;
  href: string;
  count?: number;
  badgeColor?: BadgeColor;
  /** Current route matches this action's `href` — rendered with `aria-current="page"` and a stronger label color. */
  isActive?: boolean;
}

export interface HeaderUser {
  name: string;
  tier?: string;
  avatarSrc?: string;
}

export interface HeaderLocation {
  location: string;
  radiusLabel: string;
}
