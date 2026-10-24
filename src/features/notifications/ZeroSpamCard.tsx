import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { routes } from "@/src/lib/routing/routes";

export interface ZeroSpamCardProps {
  averagePerDay: number;
}

/** "1 alerte / jour" / "2 alertes / jour" — fr-FR treats 0 as plural, same convention as the rest of the app. */
function formatFrequencyLabel(averagePerDay: number): string {
  const value = averagePerDay.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  return averagePerDay === 1 ? `${value} alerte / jour` : `${value} alertes / jour`;
}

/**
 * N7 — beige, no shadow, text spans the card's full width (the maquette
 * squeezes it into a narrow column — rule 4.0/12 #4: fixed here).
 * "En savoir plus" points at Support: no dedicated privacy-policy route
 * exists yet (compte-rendu écart), Support is the nearest real page.
 */
export function ZeroSpamCard({ averagePerDay }: ZeroSpamCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-catalog-chip p-5">
      <div className="flex items-center gap-3">
        <IconTile icon="shield" tone="dark" />
        <p className="text-base font-bold text-foreground-strong">Engagement Zéro Spam</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Vos notifications proviennent uniquement de vos commerçants de quartier favoris. Pas de publicités tierces, données protégées et conformes RGPD
        en France.
      </p>
      <div className="flex items-center justify-between gap-2 border-t border-border pt-3 text-xs">
        <span className="font-semibold text-foreground-strong">Fréquence moyenne : {formatFrequencyLabel(averagePerDay)}</span>
        <TextLink href={routes.main.support} variant="default">
          En savoir plus
        </TextLink>
      </div>
    </div>
  );
}
