import type { HighlightSegment } from "@/src/domain/store-merchandising";

const EMPHASIS_CLASSES: Record<NonNullable<HighlightSegment["emphasis"]>, string> = {
  highlight: "rounded bg-surface/20 px-1",
  strong: "font-extrabold",
  link: "underline underline-offset-2 font-bold",
  accent: "font-bold text-store-accent-gold",
};

export interface HighlightedTextProps {
  segments: HighlightSegment[];
  className?: string;
}

/** Renders mixed-emphasis text safely by construction (never `dangerouslySetInnerHTML`) — the promo banner title and the parcel banner's accented date both go through this. */
export function HighlightedText({ segments, className = "" }: HighlightedTextProps) {
  return (
    <span className={className}>
      {segments.map((segment) => (
        <span key={`${segment.emphasis ?? "plain"}-${segment.text}`} className={segment.emphasis && EMPHASIS_CLASSES[segment.emphasis]}>
          {segment.text}
        </span>
      ))}
    </span>
  );
}
