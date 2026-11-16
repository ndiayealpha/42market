import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Container } from "@/src/components/layout/Container/Container";
import type { FaqItem } from "@/src/domain/faq";
import { routes } from "@/src/lib/routing/routes";

import { ClickCollectSection } from "./ClickCollectSection";
import { FaqAccordion } from "./FaqAccordion";
import { FaqHero } from "./FaqHero";

export interface FaqTemplateProps {
  items: FaqItem[];
}

export function FaqTemplate({ items }: FaqTemplateProps) {
  return (
    <Container className="flex flex-col gap-12 py-10">
      <FaqHero />
      <FaqAccordion items={items} />
      <ClickCollectSection />

      <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-subtle px-6 py-8 text-center">
        <p className="text-base font-semibold text-foreground-strong">Une autre question ?</p>
        <p className="max-w-md text-sm text-ink-muted">Notre équipe vous répond directement, sans robot ni attente.</p>
        <ButtonLink href={routes.main.contact} variant="primary-md">
          Nous contacter
        </ButtonLink>
      </div>
    </Container>
  );
}
