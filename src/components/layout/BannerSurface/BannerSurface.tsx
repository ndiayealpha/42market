import type { ReactNode } from "react";

export type BannerTone = "brown" | "forest";

const TONE_CLASSES: Record<BannerTone, string> = {
  brown: "bg-foreground text-white", // #39211F — confirmed against Main.png by pixel sampling
  forest: "bg-store-promo-forest text-white", // #1C331E — measured, no existing token close enough
};

export interface BannerSurfaceProps {
  tone: BannerTone;
  children: ReactNode;
  className?: string;
}

/** The dark background shared by the parcel banner (brown) and the promo banner (forest green). */
export function BannerSurface({ tone, children, className = "" }: BannerSurfaceProps) {
  return <div className={`overflow-hidden rounded-2xl ${TONE_CLASSES[tone]} ${className}`}>{children}</div>;
}
