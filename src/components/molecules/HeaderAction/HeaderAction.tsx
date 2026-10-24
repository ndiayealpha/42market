import Link from "next/link";

import { Badge, type BadgeColor } from "@/src/components/atoms/Badge/Badge";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface HeaderActionProps {
  icon: IconName;
  label: string;
  href: string;
  count?: number;
  badgeColor?: BadgeColor;
  /** Current route matches `href`. Defaults to `false` — every existing usage is unaffected. */
  isActive?: boolean;
}

/**
 * One icon action in the header's action group (Favoris / Notifications /
 * Cabas). Generic on purpose — each usage only differs by its data.
 */
export function HeaderAction({ icon, label, href, count, badgeColor = "info", isActive = false }: HeaderActionProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`group flex flex-col items-center gap-1 ${isActive ? "text-foreground-strong" : "text-foreground"}`}
    >
      <span className="relative inline-flex">
        <Icon name={icon} size={22} decorative />
        {typeof count === "number" && count > 0 && (
          <span className="absolute -right-2 -top-2">
            <Badge variant="count" color={badgeColor}>
              {count}
            </Badge>
          </span>
        )}
      </span>
      <span className={`text-xs font-medium group-hover:text-foreground ${isActive ? "font-semibold text-foreground-strong" : "text-muted-foreground"}`}>
        {label}
      </span>
    </Link>
  );
}
