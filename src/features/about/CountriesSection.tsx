import { ABOUT_STATS } from "./about.constants";
import { CountryChipsGrid } from "./CountryChipsGrid";

export function CountriesSection() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="max-w-2xl">
        <p className="text-[13px] font-bold uppercase text-ink-muted">Ce qui nous rassemble</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Plus qu&apos;une marketplace, un pont entre les cultures.
        </h2>
        <p className="mt-2 text-sm text-ink-muted sm:text-base">
          Nous cartographions et outillons numériquement les épiceries de quartier indépendantes qui font battre le cœur de nos villes, pour que
          personne ne renonce aux saveurs qui l&apos;ont fait grandir.
        </p>
      </div>

      <CountryChipsGrid />

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 rounded-xl bg-surface px-3 py-5 shadow-card">
            <p className="text-2xl font-extrabold text-catalog-success sm:text-3xl">{stat.value}</p>
            <p className="text-sm font-bold text-foreground-strong">{stat.label}</p>
            <p className="text-xs text-ink-muted">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
