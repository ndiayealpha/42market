import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

interface StatTile {
  icon: IconName;
  value: string;
  label: string;
}

export interface GroupPreorderStatsProps {
  openCampaignsCount: number;
  averageDiscountPercent: number;
}

/**
 * The 4 stat tiles. Only the first two are computed from real campaign
 * data (`openCampaignsCount`, `averageDiscountPercent`); the other two
 * are fixed program guarantees, not per-campaign facts. A dedicated tile
 * here rather than the shared `StatCard` molecule, whose `value` is a
 * bare number — these need a unit baked into the string ("-32 %", "0 €").
 */
export function GroupPreorderStats({ openCampaignsCount, averageDiscountPercent }: GroupPreorderStatsProps) {
  const tiles: StatTile[] = [
    { icon: "truck", value: String(openCampaignsCount), label: "Campagnes ouvertes cette semaine à Saint-Étienne" },
    { icon: "tag", value: `-${averageDiscountPercent}%`, label: "Économie moyenne constatée sur gros volumes" },
    { icon: "basket", value: "0 €", label: "Retrait Click & Collect gratuit en boutique partenaire" },
    { icon: "check-circle", value: "100%", label: "Débité uniquement si le palier groupé est atteint" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiles.map((tile) => (
        <div key={tile.label} className="flex items-start gap-3 rounded-xl bg-surface-subtle p-4">
          <Icon name={tile.icon} size={20} className="mt-0.5 shrink-0 text-foreground-strong" decorative />
          <div>
            <p className="text-xl font-extrabold text-foreground-strong">{tile.value}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{tile.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
