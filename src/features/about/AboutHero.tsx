import type { IconName } from "@/src/components/atoms/Icon/Icon";
import { Icon } from "@/src/components/atoms/Icon/Icon";

const FEATURES: { icon: IconName; label: string }[] = [
  { icon: "tag", label: "100% Indépendant & Solidaire" },
  { icon: "store", label: "Circuits courts & Quartiers" },
  { icon: "clock", label: "Click & Collect 0€ Caché" },
  { icon: "check-circle", label: "Terroirs Authentiques" },
];

export function AboutHero() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-catalog-badge-cream px-3 py-1.5 text-[13px] font-bold uppercase text-foreground-strong">
        <Icon name="sparkle" size={14} decorative />
        Notre histoire &amp; notre manifeste
      </span>
      <h1 className="max-w-2xl text-3xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[40px]">
        Le goût de chez nous,
        <br />
        partout en France.
      </h1>
      <p className="max-w-2xl text-sm text-ink-muted sm:text-base">
        L&apos;histoire de Sam &amp; Amadou, deux enfants de la diaspora qui ont transformé le manque des saveurs d&apos;enfance en un pont d&apos;accès
        direct vers les 500+ épiceries de quartier indépendantes.
      </p>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.label} className="flex flex-col items-center gap-2 rounded-xl bg-surface px-3 py-4 text-center shadow-card sm:flex-row sm:text-left">
            <Icon name={feature.icon} size={20} className="shrink-0 text-foreground-strong" decorative />
            <span className="text-xs font-semibold text-foreground-strong sm:text-sm">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
