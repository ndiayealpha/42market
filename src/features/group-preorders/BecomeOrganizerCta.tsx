import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

/**
 * "Proposer une campagne" has no dedicated form yet, so it reuses the
 * same placeholder contact route already shared by the other "en savoir
 * plus" CTAs app-wide (`HelpCard`, `ZeroSpamCard`, `SupportBar`,
 * `FindStoreCta`) rather than a new dead link.
 */
export function BecomeOrganizerCta() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-subtle p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-catalog-chip">
          <Icon name="truck" size={18} className="text-foreground-strong" decorative />
        </span>
        <div>
          <p className="text-sm font-extrabold text-foreground-strong">Vous êtes épicier ou responsable d&apos;un comité d&apos;entreprise ?</p>
          <p className="text-xs text-ink-muted">Lancez vos propres précommandes groupées ou commandez des palettes complètes sur 42 Markets.</p>
        </div>
      </div>
      <ButtonLink href={routes.main.support} variant="primary-md" className="shrink-0 self-start sm:self-center">
        Proposer une campagne
      </ButtonLink>
    </div>
  );
}
