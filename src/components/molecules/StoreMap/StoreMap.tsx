import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface StoreMapProps {
  /**
   * Google's classic iframe-embed URL (`buildMapEmbedUrl`) for a single,
   * real store address — auto-displayed, no click needed (N1, 2026-11-17
   * UAT). Omitted for the multi-store "all of Saint-Étienne" map view,
   * which keeps the old decorative placeholder (a single embed doesn't fit
   * a whole-agglomération view, and that page is out of this UAT's scope).
   */
  embedUrl?: string;
  directionsUrl: string;
  caption?: string;
  className?: string;
}

export function StoreMap({ embedUrl, directionsUrl, caption, className = "" }: StoreMapProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-catalog-chip ${className}`} style={{ aspectRatio: "16/7" }}>
      {embedUrl ? (
        <iframe src={embedUrl} title="Localisation de l'épicerie" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
          <Icon name="location" size={28} className="text-catalog-faint" decorative />
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground-strong underline underline-offset-2">
            Voir sur la carte
          </a>
        </div>
      )}
      {embedUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-foreground-strong shadow-card hover:bg-background"
        >
          Itinéraire
        </a>
      )}
      {caption && (
        <p className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground-strong shadow-card">
          <Icon name="location" size={12} decorative />
          {caption}
        </p>
      )}
    </div>
  );
}
