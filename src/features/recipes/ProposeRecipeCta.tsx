import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

/** No recipe-submission flow or Charte Culinaire page exists yet — both CTAs point at `routes.main.support` (the app's one established placeholder for an unbuilt flow), same convention as `FindStoreCta`/`BecomeOrganizerCta`. TODO: build a dedicated submission form + charte page. */
export function ProposeRecipeCta() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border-2 border-dashed border-catalog-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Chip tone="cream" size="sm" shape="pill" uppercase className="w-fit font-bold">
          <Icon name="user" size={12} /> Cuisinières &amp; Cuisiniers de Saint-Étienne
        </Chip>
        <h2 className="mt-2 text-lg font-extrabold text-foreground-strong sm:text-xl">Vous avez une recette de famille secrète ?</h2>
        <p className="mt-1 max-w-xl text-sm text-ink-muted">
          Transmettez votre héritage culinaire aux habitants du bassin forézien. Si votre recette est sélectionnée, elle sera testée en atelier et reliée
          aux étals des épiceries partenaires avec votre nom d&apos;auteur.
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <ButtonLink href={routes.main.support} variant="accent">
          Proposer une recette de famille
        </ButtonLink>
        <ButtonLink href={routes.main.support} variant="soft">
          Consulter la Charte Culinaire
        </ButtonLink>
      </div>
    </div>
  );
}
