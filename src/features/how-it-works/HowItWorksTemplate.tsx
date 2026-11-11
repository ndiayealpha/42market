import { Container } from "@/src/components/layout/Container/Container";

import { HowItWorksHero } from "./HowItWorksHero";
import { HowItWorksSteps } from "./HowItWorksSteps";
import { JoinCta } from "./JoinCta";
import { RecipeBasketTeaser } from "./RecipeBasketTeaser";
import { ValuesSection } from "./ValuesSection";

/** Pure, static page — no fetch, no client interactivity, so no View/hook layer is needed above this template. */
export function HowItWorksTemplate() {
  return (
    <Container className="flex flex-col gap-12 py-10">
      <HowItWorksHero />
      <HowItWorksSteps />
      <RecipeBasketTeaser />
      <JoinCta />
      <ValuesSection />
    </Container>
  );
}
