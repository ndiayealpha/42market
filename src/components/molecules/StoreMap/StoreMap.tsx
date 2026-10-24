import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface StoreMapProps {
  directionsUrl: string;
  caption?: string;
  className?: string;
}

/**
 * No map library exists in the repo and none is added here (Phase 0 audit
 * found no Leaflet/Google Maps SDK, and rule 11 forbids a new dependency
 * without justification) — this is the "jamais un trou" fallback: a
 * decorative tile with a real, working directions link, never a loading
 * spinner that goes nowhere. Flagged in the compte-rendu as the spot a real
 * embed (behind a cookie-consent gate, which also doesn't exist yet) would
 * plug in.
 */
export function StoreMap({ directionsUrl, caption, className = "" }: StoreMapProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-catalog-chip ${className}`} style={{ aspectRatio: "16/7" }}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
        <Icon name="location" size={28} className="text-catalog-faint" decorative />
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground-strong underline underline-offset-2">
          Voir sur la carte
        </a>
      </div>
      {caption && (
        <p className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground-strong shadow-card">
          <Icon name="location" size={12} decorative />
          {caption}
        </p>
      )}
    </div>
  );
}
