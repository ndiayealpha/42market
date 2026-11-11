import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

export function NewArrivalsHero() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Saint-Étienne" },
          { label: "Nouveaux Arrivages & Débarquements de la Semaine" },
        ]}
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <Chip tone="gold" size="sm" shape="pill" icon={<Icon name="truck" size={14} decorative />} className="font-bold">
            Débarquements Jeudi &amp; Vendredi • Récoltes fraîches
          </Chip>
          <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
            Nouveaux Arrivages du Terroir par Épicerie
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Fret aérien express, cargaisons maritimes fraîches et récoltes maraîchères de la semaine. Réservez les pépites rares en Click &amp;
            Collect direct chez vos épiciers de quartier.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-surface-subtle p-4">
          <Icon name="timer" size={20} className="text-foreground-strong" decorative />
          <div className="text-sm">
            <p className="font-bold text-foreground-strong">Prochain vol fret Rungis / Afrique</p>
            <p className="text-ink-muted">Samedi matin · 06h30 à Saint-Étienne</p>
          </div>
        </div>
      </div>
    </div>
  );
}
