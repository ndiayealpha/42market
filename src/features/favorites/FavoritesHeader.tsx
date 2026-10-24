import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { DEFAULT_LOCATION } from "@/src/components/organisms/Header/Header.constants";

export interface FavoritesHeaderProps {
  cityName: string;
  availableCount: number;
}

/** F1 — the catchment chip's postal code is the Header's own location (rule F1: "BASSIN 42000 = code postal de la localisation du Header"), never a separate hardcoded value. */
export function FavoritesHeader({ cityName, availableCount }: FavoritesHeaderProps) {
  const postalCode = DEFAULT_LOCATION.location.split(",")[0]?.trim();

  return (
    <Card variant="elevated" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground-strong text-white">
          <Icon name="heart" size={20} decorative />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground-strong sm:text-[28px]">Mes Favoris</h1>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Retrouvez vos articles sauvegardés et terroirs d&apos;ailleurs pour préparer votre commande <strong className="font-semibold text-foreground-strong">Click &amp; Collect</strong> en{" "}
            <strong className="font-semibold text-foreground-strong">2h</strong> auprès de vos épiceries indépendantes de {cityName}.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 rounded-xl bg-catalog-chip px-4 py-3">
        <span aria-hidden className="h-2 w-2 rounded-full bg-success" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Bassin {postalCode}</p>
          <p className="text-sm font-bold text-foreground-strong">{availableCount} articles disponibles</p>
        </div>
      </div>
    </Card>
  );
}
