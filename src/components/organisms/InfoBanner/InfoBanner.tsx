import type { ReactNode } from "react";

import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import type { IconName } from "@/src/components/atoms/Icon/Icon";

export interface InfoBannerProps {
  icon: IconName;
  title: ReactNode;
  description: string;
  trailing?: ReactNode;
  className?: string;
}

/** The beige info banner shell (`ExclusiveOrderBanner`'s "Commande exclusive par boutique") — icon + title/description, an optional trailing slot (meta chips). Nothing like it existed before (Phase 0 audit). */
export function InfoBanner({ icon, title, description, trailing, className = "" }: InfoBannerProps) {
  return (
    <div className={`flex flex-col gap-4 rounded-2xl bg-catalog-chip p-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div className="flex items-start gap-3">
        <IconTile icon={icon} tone="neutral" />
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-foreground-strong">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {trailing && <div className="flex shrink-0 flex-wrap items-center gap-2">{trailing}</div>}
    </div>
  );
}
