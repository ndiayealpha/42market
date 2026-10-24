import type { ReactNode } from "react";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Nothing like it existed before (Phase 0 audit) — new primitive, used by every "rien à afficher" case (empty rayon, no promo, no results). */
export function EmptyState({ icon = "search", title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center ${className}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-catalog-chip">
        <Icon name={icon} size={22} className="text-catalog-faint" decorative />
      </span>
      <div>
        <p className="font-semibold text-foreground-strong">{title}</p>
        {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
