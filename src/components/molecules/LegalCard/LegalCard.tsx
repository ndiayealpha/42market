/**
 * Minors-protection / alcohol-sale notice, required alongside any sale
 * of alcoholic drinks in France (Code de la santé publique, art.
 * L.3342-1 and L.3353-3). Static regulatory text — not config-driven,
 * since it doesn't vary and isn't shared with anything else.
 */
export function LegalCard() {
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-base">
          🇫🇷
        </span>
        <p className="text-[11px] font-bold uppercase leading-tight tracking-wide text-foreground-strong">
          République française • Protection des mineurs
        </p>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        <span className="font-bold text-foreground-strong">
          Interdiction de vente de boissons alcooliques aux mineurs de moins de 18 ans.
        </span>{" "}
        La preuve de majorité de l&apos;acheteur est exigée au moment de la vente en ligne ou du retrait en épicerie.{" "}
        <span className="font-bold text-foreground-strong">Code de la santé publique, art. L.3342-1 et L.3353-3.</span>
      </p>

      <div className="mt-3 rounded-xl bg-surface-subtle p-3 text-xs text-foreground-strong">
        Pour votre santé, pratiquez une activité physique régulière.{" "}
        <a
          href="https://www.mangerbouger.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          mangerbouger.fr
        </a>
      </div>
    </div>
  );
}
