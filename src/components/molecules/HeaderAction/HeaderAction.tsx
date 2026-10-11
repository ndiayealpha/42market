import Link from "next/link";

import { Badge, type BadgeColor } from "@/src/components/atoms/Badge/Badge";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface HeaderActionProps {
  icon: IconName;
  label: string;
  href: string;
  count?: number;
  badgeColor?: BadgeColor;
}

/**
 * One icon action in the header's action group (Favoris / Notifications /
 * Cabas). Generic on purpose — each usage only differs by its data.
 */
export function HeaderAction({ icon, label, href, count, badgeColor = "info" }: HeaderActionProps) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-1 text-foreground">
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
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{label}</span>
    </Link>
  );
}
