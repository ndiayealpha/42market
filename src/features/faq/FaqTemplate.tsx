import { Container } from "@/src/components/layout/Container/Container";
import type { FaqItem } from "@/src/domain/faq";

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
    </Container>
  );
}
