import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Container } from "@/src/components/layout/Container/Container";
import { routes } from "@/src/lib/routing/routes";

export interface LegalPageTemplateProps {
  title: string;
}

/**
 * Minimal real page for a footer legal link that had no page at all
 * before this mission (`/main/mentions-legales`, `/main/politique-de-confidentialite`,
 * `/main/cgv`, `/main/gestion-des-cookies`) — honest "contenu en cours de
 * rédaction" placeholder rather than a fabricated legal text, and rather
 * than leaving the Footer link as a literal "#" or a 404.
 */
export function LegalPageTemplate({ title }: LegalPageTemplateProps) {
  return (
    <Container className="flex flex-col gap-6 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: routes.main.home }, { label: title }]} />
      <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">{title}</h1>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-12 text-center">
        <Icon name="archive" size={24} className="text-catalog-faint" decorative />
        <p className="font-semibold text-foreground-strong">Contenu en cours de rédaction</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Cette page est en cours de finalisation avec notre service juridique. Pour toute question en attendant, contactez-nous directement.
        </p>
        <ButtonLink href={routes.main.contact} variant="soft">
          Nous contacter
        </ButtonLink>
      </div>
    </Container>
  );
}
