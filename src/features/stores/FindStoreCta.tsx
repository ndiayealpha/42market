import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { routes } from "@/src/lib/routing/routes";

/**
 * "Vous êtes épicier ? Rejoindre le réseau" → the real merchant onboarding
 * page. "Recommander une épicerie" → `routes.main.support`, now an alias
 * for the real Contact page (see `routes.ts`), same as several other
 * "contact us" CTAs across the app (`HelpCard`, `ZeroSpamCard`, `SupportBar`).
 */
export function FindStoreCta() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-subtle p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-lg font-extrabold text-foreground-strong">Vous ne trouvez pas votre épicerie de quartier ?</p>
        <p className="mt-1 max-w-xl text-sm text-ink-muted">
          Notre plateforme s&apos;enrichit grâce aux recommandations des habitants. Faites-nous découvrir votre commerçant favori ou rejoignez le
          réseau si vous gérez une boutique exotique sur la métropole.
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <ButtonLink href={routes.main.support} variant="soft">
          Recommander une épicerie
        </ButtonLink>
        <ButtonLink href={routes.main.merchantOnboarding} variant="primary-md">
          Vous êtes épicier ? Rejoindre le réseau
        </ButtonLink>
      </div>
    </div>
  );
}
