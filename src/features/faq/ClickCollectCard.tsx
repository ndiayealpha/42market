import type { ReactNode } from "react";

import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";

export interface ClickCollectCardProps {
  badgeLabel: string;
  title: string;
  description: string;
  bullets: string[];
  footerLabel: string;
  tone?: "light" | "brown";
}

export function ClickCollectCard({ badgeLabel, title, description, bullets, footerLabel, tone = "light" }: ClickCollectCardProps) {
  const isBrown = tone === "brown";

  const content: ReactNode = (
    <div className="flex h-full flex-col gap-3">
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase ${
          isBrown ? "bg-white/10 text-white" : "bg-catalog-badge-cream text-foreground-strong"
        }`}
      >
        {badgeLabel}
      </span>
      <h3 className="text-base font-bold">{title}</h3>
      <p className={`text-sm ${isBrown ? "text-white/80" : "text-ink-muted"}`}>{description}</p>
      <ul className="flex flex-col gap-1.5 text-sm">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <Icon name="check-circle" size={16} className={`mt-0.5 shrink-0 ${isBrown ? "text-white" : "text-foreground-strong"}`} />
            <span className={isBrown ? "text-white/90" : "text-foreground-strong"}>{bullet}</span>
          </li>
        ))}
      </ul>
      {/* Informative footer, never a link/button — no "être prévenu" form exists yet to wire it to. */}
      <span
        className={`mt-auto inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-bold ${
          isBrown ? "bg-white/10 text-white/70" : "bg-foreground-strong text-white"
        }`}
      >
        {footerLabel}
      </span>
    </div>
  );

  if (isBrown) {
    return <BannerSurface tone="brown" className="p-5">{content}</BannerSurface>;
  }

  return (
    <Card variant="elevated" className="p-5">
      {content}
    </Card>
  );
}
