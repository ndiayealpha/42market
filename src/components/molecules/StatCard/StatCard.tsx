import Link from "next/link";

export interface StatCardProps {
  value: number;
  label: string;
  /** The "Points Terroir" card in the maquette gets a highlighted (cream) tile — everything else is plain. */
  highlight?: boolean;
  /** Makes the tile a link (e.g. "Favoris" → the Favorites page). Absent by default — every existing usage is unaffected. */
  href?: string;
  className?: string;
}

const TILE_CLASSES = "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-4 py-3 text-center";

/** One of the 3 tiles on the profile hero card (Commandes / Favoris / Points Terroir) — nothing like it existed before (Phase 0 audit). */
export function StatCard({ value, label, highlight = false, href, className = "" }: StatCardProps) {
  const toneClass = highlight ? "bg-store-accent-gold/40" : "bg-catalog-chip";
  const content = (
    <>
      <span className="text-2xl font-extrabold text-foreground-strong">{value}</span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${TILE_CLASSES} ${toneClass} transition-colors hover:bg-catalog-chip-hover ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`${TILE_CLASSES} ${toneClass} ${className}`}>{content}</div>;
}
