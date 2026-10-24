import Link from "next/link";
import type { ReactNode } from "react";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface SettingsListItemBaseProps {
  /** Omit for the "flat" layout (no leading icon tile) — e.g. a settings card whose icon already sits in its own title. */
  icon?: IconName;
  title: string;
  description: string;
  className?: string;
}

type SettingsListItemProps =
  | (SettingsListItemBaseProps & { trailing: "chevron"; href: string })
  | (SettingsListItemBaseProps & { trailing: "action"; actionLabel: string; href: string })
  | (SettingsListItemBaseProps & { trailing: "switch"; children: ReactNode });

/**
 * One row contract, 3 trailing variants (chevron / action link / custom
 * control such as a `Switch`) — rule L: every variant still renders the
 * same icon + title + description layout. Nothing like it existed before
 * (Phase 0 audit).
 */
export function SettingsListItem(props: SettingsListItemProps) {
  const { icon, title, description, className = "" } = props;

  const content = (
    <>
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-catalog-chip text-foreground-strong">
          <Icon name={icon} size={18} decorative />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground-strong">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">{description}</span>
      </span>
    </>
  );

  if (props.trailing === "chevron") {
    return (
      <Link
        href={props.href}
        className={`flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-background ${className}`}
      >
        {content}
        <Icon name="chevron-right" size={18} className="shrink-0 text-muted-foreground" decorative />
      </Link>
    );
  }

  if (props.trailing === "action") {
    return (
      <div className={`flex items-center gap-3 rounded-xl px-3 py-3 ${className}`}>
        {content}
        <Link href={props.href} className="shrink-0 text-sm font-semibold text-foreground-strong hover:underline">
          {props.actionLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 rounded-xl px-3 py-3 ${className}`}>
      {content}
      <span className="shrink-0">{props.children}</span>
    </div>
  );
}
