import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { routes } from "@/src/lib/routing/routes";

/** The one 404 body, reused by both `app/main/not-found.tsx` (inherits the Header/Footer from `app/main/layout.tsx`) and the root `app/not-found.tsx` (composes them itself) — same `EmptyState` primitive as every other "rien à afficher" case in the app. */
export function NotFoundView() {
  return (
    <Container className="flex flex-1 items-center justify-center py-16">
      <EmptyState
        icon="search"
        title="404 — Cette page n'existe pas"
        description="Le lien suivi est introuvable ou n'est plus disponible. Essayez l'accueil ou retrouvez une épicerie près de chez vous."
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={routes.main.home} variant="primary-md">
              Retour à l&apos;accueil
            </ButtonLink>
            <ButtonLink href={routes.main.epiceries} variant="soft">
              Découvrir les épiceries
            </ButtonLink>
          </div>
        }
      />
    </Container>
  );
}
